import { PeopleProfile } from "@/components/site/PeopleProfile";
import { DIRECTOR } from "@/lib/aboutContent";

const Director = () => (
  <PeopleProfile
    eyebrow="Administration"
    title="Director"
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Director" }]}
    {...DIRECTOR}
  />
);

export default Director;
