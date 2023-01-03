export interface Info {
  label: string;
  detailsHtml: string;
}

export const BIO_INFO: Info[] = [
  {
    label: 'Work',
    detailsHtml: `
        <div>
            Healthymind - Founder
            <ul>
                <li>Sole engineer creating a service to aid behavioral health professionals in the intake, assessment, and diagnosis of new patients.</li>
                <li>Key features were automated diagnostic recommendations and note generation for streamlined billing.</li>
                <li>Site built HIPAA compliant.</li>
                <li>Frontend developed in React/Typescript and deployed with Netlify.</li>
                <li>Backend REST APIs developed in Node.js/Typescript and deployed to Google Cloud Functions.</li>
                <li>Code deployment automated using GitHub actions.</li>
                <li>Database used AzureSQL and interfaced through Prisma.</li>
            </ul>
        </div>
        <div>
            Google - Software Engineer II
            <ul>
                <li>Frontend development for Google Domains using Angular/Typescript and Java.</li>
                <li>Frontend/Backend development for Ads (Display and Video 360) using Angular/Dart and Java.</li>
                <li>Leading development of complex features for millions of daily users from design to launch.</li>
                <li>Collaborating and fostering communication across multiple teams for projects I have driven.</li>
                <li>Mentoring interns and volunteering in programs to help new grad hires.</li>
            </ul>
        </div>
    `,
  },
  {
    label: 'Education',
    detailsHtml: `
        <div class="degree">
            University of Arizona
            <div>Bachelor of Science: Computer Science</div>
            <div>Graduated 2017</div>
        </div>
        <div class="degree">
            Pima Community College
            <div>Associate of Science: Physics</div>
            <div>Graduated 2015</div>
        </div>
        <div>
            I have also been taking Udacity's Deep Learning program to because I find AI fascinating and want to 
            learn more about the field
        </div>
    `,
  },
  {
    label: 'Skills',
    detailsHtml: `
      <div>
        I can write hella code. Specifically I have notable experience with the following technologies:

        <table>
          <tr>
            <td>Typescript/Javascript</td>
            <td>React</td>
          </tr>
          <tr>
            <td>ReactNative</td>
            <td>Angular</td>
          </tr>
          <tr>
            <td>Node.js</td>
            <td>HTML/CSS</td>
          </tr>
          <tr>
            <td>Java</td>
            <td>Three.js</td>
          </tr>
          <tr>
            <td>Git/Github</td>
            <td>Google cloud/Azure</td>
          </tr>
        </table>

        In addition to what I have listed I have become more familiar with Python and machine learning thanks to
        the deep learning class I have been following. Also I just love learning about new tech and trying them out. 
      </div>
    `,
  },
  { label: 'Links', detailsHtml: `Github, LinkedIn, Instagram` },
  {
    label: 'Road trips',
    detailsHtml: `
        <p>
            My dad loved road trips so growing up we took a lot of them. As young children though my siblings and I 
            initially hated being in our family van for such long periods of time but because humanity's greatest strength 
            is the ability to adapt to our environments we eventually got used to it and even grew to love road trips.
        </p>
        <p>
            The biggest trip we ever did was kind of a tour of the United States when I was 12. We started in my hometown 
            (Sierra Vista, AZ) and drove through the south on I-10 to visit my grandmother in South Carolina. After spending 
            a week at her place we then drove back through the midwest this time. In total the trip took a month to do.
        </p>
        <p>
            I personally have driven between Seattle, WA and Tucson, AZ over 10 times. When I moved to NYC in July I 
            chose to drive just me and my dog from Seattle. It was so fun, we had a blast.
        </p>
    `,
  },
  { label: 'Dog', detailsHtml: `I have a dog. Here is a picture of him:` },
  { label: 'Seattle', detailsHtml: `I lived here` },
  { label: 'Youth', detailsHtml: `I was young once. Have some proof: ` },
  { label: 'Pizza', detailsHtml: `Love em` },
  {
    label: 'Books',
    detailsHtml: `
        Big sci-fi fan. Especially older sci-fi: Speaker for the Dead, Stranger in a strange land, Dune.
        Recently though I have been trying to broaden my choice in books. I read Three Day Road and oh boy I cried.
    `,
  },
  { label: 'Cooking', detailsHtml: `I suck at cooking.` },
  {
    label: 'Spelling bee',
    detailsHtml: `
        I won my fifth grade class spelling bee. That's all. Just always looking for a venue to brag about it.
    `,
  },
  {
    label: 'Piano',
    detailsHtml: `
        I took lessons for a couple of years when I was 8 but then didn't pick it back up until I was 16. Couldn't 
        recall anything I was taught except for how to barely read sheet music but it was very very fun so I 
        kept fiddling with it.
    `,
  },
];
