import puppeteer from "puppeteer";
import { load } from "cheerio";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

class LinkedInScrapper {
  private cookie: string;
  private profileLink: string;

  constructor(cookie: string, profileLink: string) {
    this.cookie = cookie;
    this.profileLink = profileLink;
  }

  async getPageInfo() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

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

  async getProfileInfo() {
    const { page, browser } = await this.getPageInfo();
    await page.goto(this.profileLink);
    await page.waitForSelector("img", { timeout: 10000 });
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
  }

  async getExperiences() {
    await delay(1000);
    const { page, browser } = await this.getPageInfo();
    await page.goto(this.profileLink + "/details/experience");
    await page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2", {
      timeout: 20000,
    });
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
  }

  async getEducations() {
    await delay(2000);
    const { page, browser } = await this.getPageInfo();
    await page.goto(this.profileLink + "/details/education");
    await page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2", {
      timeout: 20000,
    });
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
  }

  async getSkills() {
    await delay(3000);
    const { page, browser } = await this.getPageInfo();
    await page.goto(this.profileLink + "/details/skills");
    await page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2", {
      timeout: 20000,
    });
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
  }
}

export default LinkedInScrapper;
