import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  HTMLAttributes,
  ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => boolean; // Changed to return boolean for validation
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
  canSubmit?: boolean; // New prop to control submit button
}

interface RenderStepIndicatorProps {
  step: number;
  currentStep: number;
  onStepClick: (clicked: number) => void;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => true,
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  canSubmit = true,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      // Only proceed if validation passes
      const canProceed = onStepChange(newStep);
      if (canProceed) {
        setCurrentStep(newStep);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(1);
      setCurrentStep(currentStep - 1);
      onStepChange(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      // Validate before moving to next step
      const canProceed = onStepChange(currentStep + 1);
      if (canProceed) {
        setDirection(-1);
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleComplete = () => {
    // Only allow completion if canSubmit is true
    if (canSubmit) {
      setDirection(-1);
      updateStep(totalSteps + 1);
    }
  };

  const handleStepClick = (clickedStep: number) => {
    if (clickedStep !== currentStep && !disableStepIndicators) {
      const canProceed = onStepChange(clickedStep);
      if (canProceed) {
        setDirection(clickedStep < currentStep ? 1 : -1);
        setCurrentStep(clickedStep);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" {...rest}>
      <div
        className={`step-circle-container w-fit mx-auto xl:min-w-[30vw] lg:min-w-[38vw] md:min-w-[80vw] min-w-[90vw] border border-border rounded-[1vw] p-[1vw] ${stepCircleContainerClassName}`}
        style={{ border: "1px solid #222" }}
      >
        <div className={`step-indicator-row ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: handleStepClick,
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={handleStepClick}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`step-content-default ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`footer-container ${footerClassName}`}>
            <div className={`footer-nav ${currentStep !== 1 ? "spread" : "end"}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`back-button cursor-pointer  ${currentStep === 1 ? "inactive" : ""}`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className={`next-button ${
                  (isLastStep && !canSubmit) || nextButtonProps?.disabled ? "disabled" : ""
                }`}
                disabled={nextButtonProps?.disabled || (isLastStep && !canSubmit)}
                {...nextButtonProps}
              >
                {isLastStep ? "Submit" : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (h: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps): JSX.Element {
  return <div className="step-default">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (step: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}: StepIndicatorProps) {
  const status =
    currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="step-indicator"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#222", color: "#a3a3a3" },
          active: { scale: 1, backgroundColor: "#9AE647", color: "#a3a3a3" },
          complete: { scale: 1, backgroundColor: "#99e6477b", color: "#a3a3a3" },
        }}
        transition={{ duration: 0.3 }}
        className="step-indicator-inner"
      >
        {status === "complete" ? (
          <CheckIcon className="check-icon" />
        ) : status === "active" ? (
          <div className="active-dot" />
        ) : (
          <span className="step-number">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#9AE647" },
  };

  return (
    <div className="step-connector">
      <motion.div
        className="step-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

function CheckIcon(props: CheckIconProps) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}