export declare const delay: (ms: number) => Promise<unknown>;
type ProfileInfo = {
    name: string;
    heading: string;
    address: string;
    about: string;
};
type Experience = {
    position: string;
    company: string;
    duration: string;
    about: string;
};
type Education = {
    schoolName: string;
    degreeField: string;
    duration: string;
};
type Skill = string;
declare class LinkedInScrapper {
    private cookie;
    private profileLink;
    constructor(cookie: string, profileLink: string);
    private getPageInfo;
    getProfileInfo(): Promise<ProfileInfo>;
    getExperiences(): Promise<Experience[]>;
    getEducations(): Promise<Education[]>;
    getSkills(): Promise<Skill[]>;
}
export default LinkedInScrapper;
