export declare const delay: (ms: number) => Promise<unknown>;
declare class LinkedInScrapper {
    private cookie;
    private profileLink;
    constructor(cookie: string, profileLink: string);
    getPageInfo(): Promise<{
        browser: import("puppeteer").Browser;
        page: import("puppeteer").Page;
    }>;
    getProfileInfo(): Promise<{
        name: string;
        heading: string;
        address: string;
        about: string;
    }>;
    getExperiences(): Promise<{
        position: string;
        company: string;
        duration: string;
        about: string;
    }[]>;
    getEducations(): Promise<{
        schoolName: string;
        degreeField: string;
        duration: string;
    }[]>;
    getSkills(): Promise<string[]>;
}
export default LinkedInScrapper;
