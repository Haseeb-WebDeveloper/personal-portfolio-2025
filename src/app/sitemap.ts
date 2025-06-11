import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

    const baseUrl = 'https://haseebkhan.online'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
            images: [
                `${baseUrl}/haseeb-ahmed-raza-khan.webp`,
                `${baseUrl}/assess-gpt-2.png`,
                `${baseUrl}/enzig.png`,
                `${baseUrl}/figmenta-live.png`,
                `${baseUrl}/figmenta-studio.png`,
                `${baseUrl}/fuzzie-automation.png`,
                `${baseUrl}/shoelite.png`,
                `${baseUrl}/rateourjob.png`,
            ]
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            images: [
                `${baseUrl}/haseeb-ahmed-raza-khan.webp`,
                `${baseUrl}/assess-gpt-2.png`,
                `${baseUrl}/enzig.png`,
                `${baseUrl}/figmenta-live.png`,
                `${baseUrl}/figmenta-studio.png`,
                `${baseUrl}/fuzzie-automation.png`,
                `${baseUrl}/shoelite.png`,
                `${baseUrl}/rateourjob.png`,
                `${baseUrl}/indiamasters.png`,
                `${baseUrl}/renodomi.png`,
                `${baseUrl}/duradomi.png`,
                `${baseUrl}/isodomi.png`,
                `${baseUrl}/sentriq.png`,
                `${baseUrl}/seaside-transportation.png`,
                `${baseUrl}/wasif-khan.png`,
            ]
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]
}