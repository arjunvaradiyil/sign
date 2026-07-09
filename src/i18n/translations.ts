export const content = {
  hero: {
    org: "Tech Workers Guild",
    title: "Justice for",
    titleHighlight: "Corro Health Employees",
    subtitle: "Stand With Keralam's Tech Workers",
    signButton: "Sign the Petition",
  },
  status: {
    loading: "Loading signature count…",
    unavailable: "Signature count unavailable",
    label: "signatures",
    signed: "{count} people have signed",
    signedOne: "1 person has signed",
    signedShort: "people have signed",
    signedOneShort: "person has signed",
  },
  footer: {
    org: "Tech Workers Guild",
    tagline: "Stand With Keralam's Tech Workers",
  },
  letter: {
    title: "Official Petition",
    subtitle: "Justice for Corro Health Employees",
    to: "To,",
    recipients:
      "The Honourable Chief Minister of Keralam / The Labour Commissioner of Keralam",
    subjectLabel: "Subject:",
    subject:
      "Intervention against the illegal mass retrenchment by Corro Health.",
    salutation: "Dear Sir/Madam,",
    p1: "Keralam is a state where the tech industry has grown considerably well over the last few years. The high quality of human resources and better infrastructure are among the main reasons for this transformation. Keralam is one of the best places in the country to have a labour-friendly atmosphere across all sectors, and any attempt to weaken that character of Keralam will not be accepted by society.",
    p2Before:
      "The recent incident of a mass layoff by the US-based company Corro Health terminating",
    p2Highlight: "800 employees in a single day without prior intimation",
    p2After:
      "is a clear violation of the law of the land and a disgrace to the pro-employee atmosphere of Keralam.",
    p3:
      "Gtech, the association of IT companies in Keralam, has also condemned the unlawful act of Corro Health and stated: \"Contrary to the company's claim, which comes against the backdrop of its decision to move to Hyderabad, Keralam is the only state in the country that provides IT companies with good infrastructure at an affordable rate. The immense talent pool is a big attraction, and these factors have been playing a major role in companies choosing to set up global capability centres (GCC) in the state.\"",
    p4: "The absence of strict intervention and uncompromising action will motivate other companies to adopt similar practices. Along with the workers' dignity, this also affects their families' stability. Given these facts, the company's decision to lay off 800 employees without due process is merely a profit-motivated act of arrogance.",
    demandsTitle: "We Demand the Following",
    demands: [
      "The State Government must intervene in this matter and take necessary action against Corro Health to ensure that legal procedures are followed before any retrenchment.",
      "The State Labour Department must issue strict directives to all companies to adhere to the due legal process before implementing any layoffs.",
    ],
  },
  form: {
    support: "I Support This Petition",
    signatoryDetails: "Signatory Details",
    name: "Name",
    profession: "Profession",
    mobile: "Mobile Number",
    location: "Location",
    namePlaceholder: "Your full name",
    professionPlaceholder: "Your profession",
    mobilePlaceholder: "10-digit mobile number",
    mobileTitle: "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9",
    locationPlaceholder: "City / District",
    submit: "Sign Petition",
    submitting: "Submitting…",
    privacy:
      "Your information will be kept secure and used only for this petition.",
    successTitle: "Thank you for signing!",
    successMessage:
      "Your signature has been recorded and added to the petition.",
    signAgain: "Sign again",
    errors: {
      allFields: "All fields are required",
      invalidMobile: "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
      saveFailed: "Failed to save signature",
      generic: "Something went wrong",
    },
  },
} as const;

export type Content = typeof content;
