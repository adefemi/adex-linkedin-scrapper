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
    getExperiencePage(): Promise<{
        position: string;
        company: string;
        duration: string;
        about: string;
    }[]>;
    getEducationPage(): Promise<{
        schoolName: string;
        degreeField: string;
        duration: string;
    }[]>;
    getSkillPage(): Promise<string[]>;
}
export default LinkedInScrapper;
