import { PeopleProfile } from "@/components/site/PeopleProfile";
import { CHAIRMAN } from "@/lib/aboutContent";

const Chairman = () => (
  <PeopleProfile
    eyebrow="Administration"
    title="Chairman's Message"
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Chairman" }]}
    {...CHAIRMAN}
  />
);

export default Chairman;
