import puppeteer from "puppeteer";
import { load } from "cheerio";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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

class LinkedInScrapper {
  private cookie: string;
  private profileLink: string;

  constructor(cookie: string, profileLink: string) {
    this.cookie = cookie;
    this.profileLink = profileLink;
  }

  private async getPageInfo() {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--ignore-certificate-errors',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
            ]
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    );
    await page.setCookie({
      name: "li_at",
      value: this.cookie,
      domain: ".linkedin.com",
    });

    return {
      browser,
      page,
    };
  }

  async getProfileInfo(): Promise<ProfileInfo> {
    try {
      const { page, browser } = await this.getPageInfo();
      await page.goto(this.profileLink);
      await page.waitForSelector("img");
      const pageContent = await page.content();
      await browser.close();

      let $ = load(pageContent);

      const name = $("#ember27").text().trim();
      const heading = $("#ember28").text().trim();
      const address = $(".pv-text-details__left-panel.mt2 span.text-body-small")
        .text()
        .trim();
      const about = $(
        '.pv-shared-text-with-see-more div.inline-show-more-text span[aria-hidden="true"]'
      )
        .first()
        .text()
        .trim();

      return {
        name,
        heading,
        address,
        about,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getExperiences(): Promise<Experience[]> {
    await delay(1000);
    try {
      const { page, browser } = await this.getPageInfo();
      await page.goto(this.profileLink + "/details/experience");
      await page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2");
      const pageContent = await page.content();
      await browser.close();

      let $ = load(pageContent);

      let experiences: {
        position: string;
        company: string;
        duration: string;
        about: string;
      }[] = [];

      $(".pvs-entity").each((_, elem) => {
        const position = $(elem)
          .find(
            "div.display-flex.align-items-center.mr1.t-bold span[aria-hidden='true']"
          )
          .first()
          .text()
          .trim();

        // For Company
        const company = $(elem)
          .find("span.t-14.t-normal span[aria-hidden='true']")
          .first()
          .text()
          .trim();

        // For Duration
        const duration = $(elem)
          .find("span.t-14.t-normal.t-black--light span[aria-hidden='true']")
          .first()
          .text()
          .trim();

        // For About
        const about = $(elem)
          .find(
            "div.display-flex.align-items-center.t-14.t-normal.t-black span[aria-hidden='true']"
          )
          .first()
          .text()
          .trim();

        experiences.push({
          position,
          company,
          duration,
          about,
        });
      });

      return experiences;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getEducations(): Promise<Education[]> {
    await delay(2000);
    try {
      const { page, browser } = await this.getPageInfo();
      await page.goto(this.profileLink + "/details/education");
      await page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2");
      const pageContent = await page.content();
      await browser.close();

      let $ = load(pageContent);

      let educations: {
        schoolName: string;
        degreeField: string;
        duration: string;
      }[] = [];

      $(".pvs-entity").each((_, elem) => {
        const schoolName = $(elem)
          .find(
            "div.display-flex.align-items-center.mr1.t-bold span[aria-hidden='true']"
          )
          .first()
          .text()
          .trim();

        // For Degree/Field
        const degreeField = $(elem)
          .find("span.t-14.t-normal span[aria-hidden='true']")
          .first()
          .text()
          .trim();

        // For Duration
        const duration = $(elem)
          .find("span.t-14.t-normal.t-black--light span[aria-hidden='true']")
          .first()
          .text()
          .trim();

        educations.push({
          schoolName,
          degreeField,
          duration,
        });
      });

      return educations;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getSkills(): Promise<Skill[]> {
    await delay(3000);
    try {
      const { page, browser } = await this.getPageInfo();
      await page.goto(this.profileLink + "/details/skills");
      await page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2");
      const pageContent = await page.content();
      await browser.close();

      let $ = load(pageContent);

      let skills: string[] = [];

      $(".pvs-entity").each((_, elem) => {
        const skill = $(elem)
          .find(
            "div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold span[aria-hidden='true']"
          )
          .first()
          .text()
          .trim();
        if (skill) {
          skills.push(skill);
        }
      });

      return skills;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default LinkedInScrapper;
