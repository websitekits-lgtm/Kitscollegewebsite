import { PeopleProfile } from "@/components/site/PeopleProfile";
import { SECRETARY } from "@/lib/aboutContent";

const Secretary = () => (
  <PeopleProfile
    eyebrow="Administration"
    title="Secretary & Correspondent"
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Secretary" }]}
    {...SECRETARY}
  />
);

export default Secretary;
