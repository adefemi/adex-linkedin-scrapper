# LinkedIn Scrapper

### Description

LinkedIn Scrapper is a Node.js package for extracting profile information from LinkedIn pages. This package is built on top of puppeteer and cheerio to scrape and parse the HTML structure of LinkedIn profiles.

### Installation

To install the LinkedIn Scrapper, run:

```
npm install adex-linkedin-scrapper
```

This will also install required dependencies puppeteer and cheerio.

### Features

- Extracts basic profile information
- Scrapes employment history
- Fetches educational background
- Grabs listed skills

### Usage

First, import the package:

```
import LinkedInScrapper from adex-linkedin-scrapper;
```

### Create Scrapper Instance

Create an instance of LinkedInScrapper:

```
const scrapper = new LinkedInScrapper("yourLinkedInCookie", "targetProfileURL");
```

### Get Profile Information

To get basic profile information:

```
const profileInfo = await scrapper.getProfileInfo();
```

This will return an object with name, heading, address, and about.

### Get Experience Information

To get employment history:

```
const experiences = await scrapper.getExperiences();
```

### Get Education Information

To get educational background:

```
const educations = await scrapper.getEducations();
```

### Get Skill Information

To get the list of skills:

```
const skills = await scrapper.getSkills();
```

### Contribute

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.