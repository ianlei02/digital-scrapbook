import HTMLFlipBook from "react-pageflip";
import TitlePage from "./TitlePage";
import TableOfContents from "./TableOfContents";
import SectionCulture from "./SectionCulture";
import SectionFolkHighPopPage1 from "./SectionFolkHighPopPage1";
import SectionFolkHighPopPage2 from "./SectionFolkHighPopPage2";
import PageCulturalRelativism from "./PageCulturalRelativism";
import PageEthnocentrism from "./PageEthnocentrism";
import SectionHistory from "./SectionHistory";
import Timeline from "./Timeline";
import SectionModernityPage1 from "./SectionModernityPage1";
import SectionModernityPage2 from "./SectionModernityPage2";
import SectionGovPolicyPage1 from "./SectionGovPolicyPage1";
import SectionGovPolicyPage2 from "./SectionGovPolicyPage2";
import ReflectionPage1 from "./ReflectionPage1";
import ReflectionPage2 from "./ReflectionPage2";
import phPattern from "@/assets/paper-dark.jpg";

const BookContainer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <HTMLFlipBook
        width={500}
        height={700}
        showCover={true}
        drawShadow={true}
        maxShadowOpacity={0.5}
        size='fixed'
        className="shadow-2xl rounded-xl"
         style={{
                  backgroundImage: `url(${phPattern})`,
                  backgroundSize: "cover",
                  backgroundPosition: "left",
                }}
        mobileScrollSupport={true}
      >
   
        <div>
          <TitlePage />
        </div>
        <div>
          <TableOfContents/>
        </div>
        <div>
          <SectionCulture/>
        </div>
        <div>
          <SectionFolkHighPopPage1/>
        </div>
        <div>
          <SectionFolkHighPopPage2/>
        </div>
        <div>
          <PageEthnocentrism/>
        </div>
        <div>
          <PageCulturalRelativism/>
        </div>
        <div>
          <SectionHistory/>
        </div>
        <div>
          <Timeline/>
        </div>
        <div>
          <SectionModernityPage1/>
        </div>
        <div>
          <SectionModernityPage2/>
        </div>
        <div>
          <SectionGovPolicyPage1/>
        </div>
        <div>
          <SectionGovPolicyPage2/>
        </div>
        <div>
          <ReflectionPage1/>
        </div>
        <div>
          <ReflectionPage2/>
        </div>

      </HTMLFlipBook>
    </div>
        //  <TitlePage />
        //   <TableOfContents />
        //   <SectionCulture />
        //   <SectionFolkHighPop />
        //   <SectionEthnoRelativism />
        //   <SectionHistory />
        //   <SectionModernity />
        //   <SectionGovPolicy />
        //   <ReflectionPage />
  );
};

export default BookContainer;
