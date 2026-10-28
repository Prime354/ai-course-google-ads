const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const roles = [
  "AI Automation Specialist",
  "Voice AI Agent Developer",
  "Chatbot / WhatsApp Bot Developer",
  "Prompt Engineer",
  "Performance Marketer",
  "Marketing Automation / Funnel Specialist",
  "AI Video Ad Creator",
  "Motion Graphics Designer",
  "Web / Landing Page Developer",
  "AI Powered Web Designer",
  "AI Solutions Consultant (SMB)",
  "AI Vibe Coder",
  "WhatsApp Business Automation Specialist",
  "E-commerce AI Growth Specialist",
  "Landing Page and Conversion (CRO) Specialist",
  "AI Social Media and UGC Content Manager",
  "AI Trainer / Corporate Workshop Instructor",
  "AI Voiceover Specialist"
];

console.log('--- OPPORTUNITY SECTION VERIFICATION ---');
let missing = 0;
roles.forEach((r, idx) => {
  const exists = html.includes(r);
  if (!exists) {
    console.log(`MISSING: ${r}`);
    missing++;
  } else {
    console.log(`${idx + 1}. OK: ${r}`);
  }
});

const cardMatches = html.match(/class="opp-card/g) || [];
console.log(`\nTotal Opp Cards Found: ${cardMatches.length} / 18`);
console.log(`Missing Roles: ${missing}`);
console.log(`AI Agency Owner removed: ${!html.includes('AI Agency Owner')}`);

const salaryRegex = /class="metric-val salary-val">([^<]+)<\/span>/g;
let sMatch;
const salaryVals = [];
while ((sMatch = salaryRegex.exec(html)) !== null) {
  salaryVals.push(sMatch[1].trim());
}
console.log('\nSalary values (Count ' + salaryVals.length + '):');
salaryVals.forEach((v, i) => console.log(`${i + 1}. "${v}"`));
const hasLPAInSalary = salaryVals.some(v => v.includes('LPA'));
console.log(`LPA in salary values present: ${hasLPAInSalary}`);

const freelanceRegex = /class="metric-val freelance-val">([^<]+)<\/span>/g;
let fMatch;
const freelanceVals = [];
while ((fMatch = freelanceRegex.exec(html)) !== null) {
  freelanceVals.push(fMatch[1].trim());
}
console.log('\nFreelance values (Count ' + freelanceVals.length + '):');
freelanceVals.forEach((v, i) => console.log(`${i + 1}. "${v}"`));

console.log('\n--- BUSINESS OWNER SECTION VERIFICATION ---');
const bizCapabilities = [
  { title: "AI Business Automation", impact: "Automate repetitive tasks and save time" },
  { title: "AI Voice Calling Agents", impact: "Handle customer calls and lead follow-ups" },
  { title: "AI Advertising", impact: "Create and manage digital ad campaigns" },
  { title: "AI Video Ad Creation", impact: "Create promotional videos and product advertisements" },
  { title: "AI Social Media Management", impact: "Plan, create and schedule content" },
  { title: "AI Website Development", impact: "Build business websites and landing pages" },
  { title: "AI Data Analysis", impact: "Analyze business data and identify useful insights" },
  { title: "AI Document & Report Creation", impact: "Prepare proposals, reports, presentations and documents" },
  { title: "AI Content Creation", impact: "Create emails, marketing copy and business content" },
  { title: "AI Business Research", impact: "Research competitors, markets and customer trends" },
  { title: "WhatsApp Business Automation", impact: "Automate replies, reminders and customer communication" },
  { title: "AI Presentation Creation", impact: "Build professional presentations and pitch decks" }
];

let bizMissing = 0;
bizCapabilities.forEach((b, idx) => {
  const hasTitle = html.includes(b.title);
  const hasImpact = html.includes(b.impact);
  if (!hasTitle || !hasImpact) {
    console.log(`MISSING BIZ ITEM: ${b.title} (Title: ${hasTitle}, Impact: ${hasImpact})`);
    bizMissing++;
  } else {
  }
});
console.log(`Business capabilities found: ${bizCapabilities.length - bizMissing} / ${bizCapabilities.length}`);

console.log('\n--- FOOTER & PHONE NUMBER VERIFICATION ---');
const oldPhoneExists = html.includes('7874070345');
console.log(`Old phone 7874070345 present: ${oldPhoneExists}`);

const phoneMatches = html.match(/9033222499/g) || [];
console.log(`New phone 9033222499 count in index.html: ${phoneMatches.length}`);

const hasCopyright = html.includes('© 2026 Prime Academy. All Rights Reserved.');
console.log(`Footer Copyright present: ${hasCopyright}`);

const hasRightGroup = html.includes('class="footer-right-group"');
console.log(`Footer Right Group present: ${hasRightGroup}`);

const hasMapsLink = html.includes('https://share.google/LqBve4CxTXJEX5E8i');
console.log(`Google Maps link present: ${hasMapsLink}`);

const hasInstaLink = html.includes('https://www.instagram.com/primeacademyindia/');
console.log(`Instagram link present: ${hasInstaLink}`);

const waMatch = html.includes('https://wa.me/919033222499');
console.log(`WhatsApp link with 9033222499 present: ${waMatch}`);

console.log('\n--- WHY PRIME ACADEMY SECTION VERIFICATION ---');
const whyPillars = [
  { title: "AI-Powered Industry Training", desc: "Learn through practical AI training, real-world projects and expert guidance." },
  { title: "AI Project Development", desc: "Work on real-world AI projects to develop practical skills and showcase your abilities." },
  { title: "AI Agency & Freelancing Opportunities", desc: "Learn how to use AI skills to build your own AI agency, offer AI-powered freelance services and deliver solutions to clients." },
  { title: "AI Expert Faculty & Mentorship", desc: "Get expert guidance to build confidence, strengthen your AI skills and prepare for professional opportunities." },
  { title: "AI Skills Beyond Degrees", desc: "Focus on practical, future-ready AI skills that support career growth, freelancing and entrepreneurship." }
];

const hasWhySection = html.includes('id="why-prime-academy"');
console.log(`Why Prime Academy section exists: ${hasWhySection}`);

const whyIndex = html.indexOf('id="why-prime-academy"');
const oppsIndex = html.indexOf('id="career-freelancing-opportunities"');
const isUnderInquiry = whyIndex > 0 && whyIndex < oppsIndex;
console.log(`Why Prime Academy placed directly under inquiry form: ${isUnderInquiry}`);

const normalizedHtml = html.replace(/\s+/g, ' ').replace(/&amp;/g, '&');

let whyMissing = 0;
whyPillars.forEach((p, idx) => {
  const hasTitle = normalizedHtml.includes(p.title);
  const hasDesc = normalizedHtml.includes(p.desc);
  if (!hasTitle || !hasDesc) {
    console.log(`MISSING PILLAR: ${p.title} (Title: ${hasTitle}, Desc: ${hasDesc})`);
    whyMissing++;
  } else {
    console.log(`${idx + 1}. OK: ${p.title}`);
  }
});
console.log(`Why Prime Pillars verified: ${whyPillars.length - whyMissing} / ${whyPillars.length}`);

const whyCardMatches = html.match(/class="why-card"/g) || [];
console.log(`Total Why Cards Found: ${whyCardMatches.length} / 5`);

const hasTitle = html.includes('<h2 class="title-opps">Why Choose Prime Academy</h2>');
console.log(`'Why Choose Prime Academy' header title present: ${hasTitle}`);

const hasBadgePill = html.includes('<span>WHY PRIME ACADEMY</span>');
console.log(`Badge pill 'WHY PRIME ACADEMY' absent: ${!hasBadgePill}`);

console.log('\n--- NEW USER REQUIREMENTS VERIFICATION ---');

// 1. Instagram and WhatsApp after submission of inquiry form
const hasSuccessWa = html.includes('id="success-wa-btn"');
const hasSuccessInsta = html.includes('class="btn-success-insta"');
console.log(`Success card WhatsApp button present: ${hasSuccessWa}`);
console.log(`Success card Instagram button present: ${hasSuccessInsta}`);

// 2. Remove Privacy Policy
const hasPrivacyPolicy = html.includes('Privacy Policy');
console.log(`Privacy Policy completely removed: ${!hasPrivacyPolicy}`);

// 3. Option for section in header
const hasHeaderNav = html.includes('id="header-nav"');
const hasMobileToggle = html.includes('id="mobile-nav-toggle"');
const hasCoursesNavLink = html.includes('href="#courses"');
const hasWhyNavLink = html.includes('href="#why-prime-academy"');
const hasCareerNavLink = html.includes('href="#career-freelancing-opportunities"');
const hasBizNavLink = html.includes('href="#ai-for-business-owners"');
const hasFaqNavLink = html.includes('href="#faq-section"');
console.log(`Header Section Navigation present: ${hasHeaderNav}`);
console.log(`Mobile Nav Toggle present: ${hasMobileToggle}`);
console.log(`All section links in header present: ${hasCoursesNavLink && hasWhyNavLink && hasCareerNavLink && hasBizNavLink && hasFaqNavLink}`);

// 4. Section of round course vertical rectangle with two courses
const hasCoursesSection = html.includes('id="courses"');
const courseCards = html.match(/class="course-vcard(?:\s|")/g) || [];
console.log(`Courses section present: ${hasCoursesSection}`);
console.log(`Vertical course cards count: ${courseCards.length} / 2`);

const coursesIndex = html.indexOf('id="courses"');
const whyIndexNow = html.indexOf('id="why-prime-academy"');
const isCoursesBeforeWhy = coursesIndex > 0 && coursesIndex < whyIndexNow;
console.log(`FIRST COURSE THEN WHY CHOOSE PRIME ACADEMY order verified: ${isCoursesBeforeWhy}`);

const course1Title = html.includes('AI Foundation Course');
const course1Desc = normalizedHtml.includes('Learn to apply AI across creative design, video production, research, workflow automation, website development and digital marketing. Develop practical skills in AI agents, lead generation, professional editing and client management to create real-world solutions and explore freelancing opportunities.');
console.log(`AI Foundation Course Title present: ${course1Title}`);
console.log(`AI Foundation Course Desc verified: ${course1Desc}`);

const course2Title = html.includes('AI Advance Course');
const course2Desc = normalizedHtml.includes('Master advanced AI workflows, intelligent automation, interactive dashboards, cinematic advertising, AI avatars, motion graphics and voice agents. Build sophisticated websites with UI/UX, animations and backend integrations while developing expertise in WhatsApp automation, digital advertising and AI-powered business solutions.');
console.log(`AI Advance Course Title present: ${course2Title}`);
console.log(`AI Advance Course Desc verified: ${course2Desc}`);

const foundationItems = [
  "AI Fundamentals & Prompt Engineering",
  "AI Content Creation & Graphic Design",
  "AI Video, Ads & Voice Production",
  "AI Automation & Productivity",
  "Website Development & Digital Marketing",
  "Freelancing, Client Acquisition & Lead Generation"
];

let foundMissing = 0;
foundationItems.forEach((item, idx) => {
  const exists = normalizedHtml.includes(item);
  if (!exists) {
    console.log(`MISSING FOUNDATION ITEM: ${item}`);
    foundMissing++;
  } else {
    console.log(`Foundation ${idx + 1}. OK: ${item}`);
  }
});
console.log(`Foundation curriculum items verified: ${foundationItems.length - foundMissing} / ${foundationItems.length}`);

const advanceItems = [
  "Advanced Prompt Engineering & AI Workflows",
  "Cinematic AI Ads, Avatars & Motion Graphics",
  "Interactive Dashboards & Advanced AI Automation",
  "Advanced Website Development, UI/UX & 3D Animations",
  "AI Agents, Voice Calling & WhatsApp Automation",
  "Advanced Meta Ads, Business Integrations & AI Agency Building"
];

let advMissing = 0;
advanceItems.forEach((item, idx) => {
  const exists = normalizedHtml.includes(item);
  if (!exists) {
    console.log(`MISSING ADVANCE ITEM: ${item}`);
    advMissing++;
  } else {
    console.log(`Advance ${idx + 1}. OK: ${item}`);
  }
});
console.log(`Advance curriculum items verified: ${advanceItems.length - advMissing} / ${advanceItems.length}`);

// Download brochure WhatsApp redirect verification
const brochureBtns = html.match(/class="btn-download-brochure"/g) || [];
console.log(`Download Brochure buttons present: ${brochureBtns.length} / 2`);

const hasBrochureModal = html.includes('id="brochure-modal"');
console.log(`Brochure modal removed from HTML: ${!hasBrochureModal}`);

const scriptJs = fs.readFileSync('script.js', 'utf8');
const noPdfInHtml = !html.toLowerCase().includes('.pdf');
const noPdfInJs = !scriptJs.toLowerCase().includes('.pdf');
const noPdfInAssets = !fs.existsSync('assets/_Prime Academy AI foundation course Final.pdf') &&
  !fs.existsSync('assets/Prime Academy AI Advance course Final.pdf') &&
  !fs.existsSync('assets/Prime_Academy_AI_Mastery_Brochure.pdf');

console.log(`No PDF references in index.html: ${noPdfInHtml}`);
console.log(`No PDF references in script.js: ${noPdfInJs}`);
console.log(`No PDF files in assets directory: ${noPdfInAssets}`);

const waFoundationLink = html.includes('https://wa.me/919033222499?text=Hello%20Prime%20Academy%2C%20please%20send%20me%20the%20AI%20Foundation%20Course%20brochure%20and%20syllabus%20on%20WhatsApp.');
const waAdvanceLink = html.includes('https://wa.me/919033222499?text=Hello%20Prime%20Academy%2C%20please%20send%20me%20the%20AI%20Advance%20Course%20brochure%20and%20syllabus%20on%20WhatsApp.');

console.log(`AI Foundation WhatsApp brochure redirect present: ${waFoundationLink}`);
console.log(`AI Advance WhatsApp brochure redirect present: ${waAdvanceLink}`);

// All salary values must end with LPA
const allSalaryHaveLPA = salaryVals.length === 18 && salaryVals.every(v => v.endsWith('LPA'));
console.log(`All 18 salary values have 'LPA' behind amount: ${allSalaryHaveLPA}`);

if (!hasSuccessWa || !hasSuccessInsta || hasPrivacyPolicy || !hasHeaderNav || !hasCoursesSection || !isCoursesBeforeWhy || !course1Desc || !course2Desc || hasBrochureModal || !noPdfInHtml || !noPdfInJs || !noPdfInAssets || !waFoundationLink || !waAdvanceLink || !allSalaryHaveLPA || foundMissing > 0 || advMissing > 0) {
  console.error('\nERROR: Some new requirement checks failed!');
  process.exit(1);
} else {
  console.log('\nALL CHECKS PASSED PERFECTLY!');
}
