const styles = {
    boxWidth: `xl:max-w-[1380px] w-full`,

    heading1: "lg:text-[48px] text-[34px] text-black xs:leading-[76.8px] leading-[50px] sm:leading-[66.8px]",
    heading2: "lg:text-[40px] sm:text-[36px] text-[24px] text-black font-bold",
    heading3: "lg:text-[30px] sm:text-[23px] text-[19px]",
    heading4: 'lg:text-[26px] sm:text-[21px] text-[17px]',
    heading5: "lg:text-[20px] sm:text-[17px] text-[12px]",
    heading6: "lg:text-[14px] sm:text-[12px] text-[10px]",
    smHeading: "text-[8px] md:text-[10px] lg:text-[13px] font-semibold font-serif",
    paragraph: "font-poppins font-normal text-slate-500 dark:text-dimWhite text-[18px] leading-[30.8px]",

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    paddingX: "sm:p-8 md:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",

    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",
};

export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export const color = {
    textBlackWhite: "text-black dark:text-white",
    textSlate: "text-slate-600 dark:text-slate-400",
}


export default styles;
