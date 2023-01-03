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
                <li>Collaborating and fostering communication across multiple teams for projects he has driven.</li>
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
            He has also been taking Udacity's Deep Learning program to because he finds AI fascinating and wants to 
            learn more about the field
        </div>
    `,
  },
  {
    label: 'Skills',
    detailsHtml: `
      <div>
        He can write hella code. Specifically he have notable experience with the following technologies:

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

        In addition to what I have listed he has become more familiar with Python and machine learning thanks to
        the deep learning class he's taking following. Also in general he just seems to love learning about new tech and trying them out. 
      </div>
    `,
  },
  {
    label: 'Road trips',
    detailsHtml: `
        <p>
            His dad loved road trips so growing up his family took a lot of them. As young children though he and his siblings  
            initially hated being in their family van for such long periods of time but because humanity's greatest strength 
            is the ability to adapt to their environments they eventually got used to it and even grew to love road trips.
        </p>
        <p>
            The biggest trip they ever did was kind of a tour of the United States when Daniel was 12. His family started in his hometown 
            (Sierra Vista, AZ) and drove through the south on I-10 to visit his grandmother in South Carolina. After spending 
            a week at her place they then drove back through the midwest. In total the trip took a month to do.
        </p>
        <p>
            Daniel personally has driven between Seattle, WA and Tucson, AZ over 10 times. When he moved to NYC in July he 
            chose to drive from Seattle with just his dog. It was so fun, they had a blast.
        </p>
    `,
  },
  { label: 'Dog', detailsHtml: `Daniel has a dog. Here is a picture of him:` },
  { label: 'Seattle', detailsHtml: `He lived there` },
  { label: 'Youth', detailsHtml: `He was young once. Have some proof: ` },
  { label: 'Pizza', detailsHtml: `The man goes feral for it` },
  {
    label: 'Books',
    detailsHtml: `
        Big sci-fi fan. Especially older sci-fi: Speaker for the Dead, Stranger in a strange land, Dune.
        Recently though Daniel has been trying to broaden his choice in books. He read Three Day Road and oh boy he cried.
    `,
  },
  { label: 'Cooking', detailsHtml: `The guy sucks at cooking.` },
  {
    label: 'Spelling bee',
    detailsHtml: `
        He won his fifth grade class spelling bee. That's all. He was really insistent on me sharing that.
    `,
  },
  {
    label: 'Piano',
    detailsHtml: `
        Daniel took lessons for a couple of years when he was 8 but then didn't pick it back up until he was 16. Couldn't 
        recall anything he was taught except for how to barely read sheet music but it was very very fun so he 
        kept fiddling with it and likes writing music as a hobby.
    `,
  },
  { label: 'Contact', detailsHtml: `Github, LinkedIn, Instagram` },
];
