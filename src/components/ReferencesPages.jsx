import React from "react";

// Flat list of all reference items without section/group labels
const allReferences = [
  { title: "Tinikling (traditional Filipino dance)", url: "https://en.wikipedia.org/wiki/Tinikling" },
  { title: "Culture of the Philippines (context)", url: "https://en.wikipedia.org/wiki/Culture_of_the_Philippines" },
  { title: "Jeepney", url: "https://en.wikipedia.org/wiki/Jeepney" },
  { title: "Culture of the Philippines", url: "https://en.wikipedia.org/wiki/Culture_of_the_Philippines" },
  { title: "Indigenous peoples of the Philippines", url: "https://en.wikipedia.org/wiki/Indigenous_peoples_of_the_Philippines" },
  { title: "Philippine mythology", url: "https://en.wikipedia.org/wiki/Philippine_mythology" },
  { title: "Art of the Philippines", url: "https://en.wikipedia.org/wiki/Art_of_the_Philippines" },
  { title: "Popular culture", url: "https://en.wikipedia.org/wiki/Popular_culture" },
  { title: "Kundiman (musical tradition)", url: "https://en.wikipedia.org/wiki/Kundiman" },
  { title: "Original Pilipino Music (OPM)", url: "https://en.wikipedia.org/wiki/Original_Pilipino_Music" },
  { title: "Manila sound (Philippine music movement)", url: "https://en.wikipedia.org/wiki/Manila_sound" },
  { title: "Original Pilipino Music (OPM)", url: "https://en.wikipedia.org/wiki/Original_Pilipino_Music" },
  { title: "Hollywood", url: "https://en.wikipedia.org/wiki/Hollywood" },
  { title: "Jazz", url: "https://en.wikipedia.org/wiki/Jazz" },
  { title: "K-pop", url: "https://en.wikipedia.org/wiki/K-pop" },
  { title: "Netflix", url: "https://en.wikipedia.org/wiki/Netflix" },
  { title: "Disney+", url: "https://en.wikipedia.org/wiki/Disney%2B" },
  { title: "TikTok", url: "https://en.wikipedia.org/wiki/TikTok" },
  { title: "Facebook", url: "https://en.wikipedia.org/wiki/Facebook" },
  { title: "Instagram", url: "https://en.wikipedia.org/wiki/Instagram" },
  { title: "Olivia Rodrigo", url: "https://en.wikipedia.org/wiki/Olivia_Rodrigo" },
  { title: "Bruno Mars", url: "https://en.wikipedia.org/wiki/Bruno_Mars" },
  { title: "H.E.R.", url: "https://en.wikipedia.org/wiki/H.E.R." },
  { title: "Bella Poarch", url: "https://en.wikipedia.org/wiki/Bella_Poarch" },
  { title: "Esports in the Philippines", url: "https://en.wikipedia.org/wiki/Esports_in_the_Philippines" },
  { title: "Overseas Filipino worker (OFW)", url: "https://en.wikipedia.org/wiki/Overseas_Filipino_worker" },
  { title: "Filipino nationalism / Pinoy Pride", url: "https://en.wikipedia.org/wiki/Filipino_nationalism" },
  { title: "1987 Constitution of the Philippines (Article XIV)", url: "https://en.wikipedia.org/wiki/1987_Constitution_of_the_Philippines" },
  { title: "National Cultural Heritage Act of 2009", url: "https://en.wikipedia.org/wiki/National_Cultural_Heritage_Act_of_2009" },
  { title: "National Commission for Culture and the Arts (NCCA)", url: "https://ncca.gov.ph/" },
  { title: "National Artists of the Philippines", url: "https://en.wikipedia.org/wiki/National_Artists_of_the_Philippines" },
  { title: "Gawad sa Manlilikha ng Bayan (GAMABA)", url: "https://en.wikipedia.org/wiki/Gawad_sa_Manlilikha_ng_Bayan" },
  { title: "National Historical Commission of the Philippines (NHI)", url: "https://en.wikipedia.org/wiki/National_Historical_Commission_of_the_Philippines" },
  { title: "National Museum of the Philippines", url: "https://en.wikipedia.org/wiki/National_Museum_of_the_Philippines" },
  { title: "Film Development Council of the Philippines (FDCP)", url: "https://en.wikipedia.org/wiki/Film_Development_Council_of_the_Philippines" },
  { title: "Cultural Center of the Philippines (CCP)", url: "https://en.wikipedia.org/wiki/Cultural_Center_of_the_Philippines" },
  { title: "Ethnocentrism (concept)", url: "https://en.wikipedia.org/wiki/Ethnocentrism" },
  { title: "Cultural relativism (concept)", url: "https://en.wikipedia.org/wiki/Cultural_relativism" },
  { title: "Bayanihan", url: "https://en.wikipedia.org/wiki/Bayanihan" },
  { title: "Procrastination (mañana habit example)", url: "https://en.wikipedia.org/wiki/Procrastination" },
];

// Split into 2 pages automatically
const midpoint = Math.ceil(allReferences.length / 2);
const page1List = allReferences.slice(0, midpoint);
const page2List = allReferences.slice(midpoint);

const basePageStyle =
  "book-page page-dotted p-6 overflow-auto bg-[url('https://i.imgur.com/7qZ8gU5.png')] bg-cover bg-center bg-no-repeat bg-opacity-20";

export const ReferencesPage1 = () => (
  <div className={basePageStyle}>
    <h2 className="font-handwriting text-3xl font-bold text-foreground mb-4">
      References (Page 1)
    </h2>

    <ul className="list-disc list-inside text-sm font-serif space-y-1">
      {page1List.map((ref, index) => (
        <li key={index}>
          <a
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {ref.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const ReferencesPage2 = () => (
  <div className={basePageStyle}>
    <h2 className="font-handwriting text-3xl font-bold text-foreground mb-4">
      References (Page 2)
    </h2>

    <ul className="list-disc list-inside text-sm font-serif space-y-1">
      {page2List.map((ref, index) => (
        <li key={index}>
          <a
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {ref.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default { ReferencesPage1, ReferencesPage2 };
