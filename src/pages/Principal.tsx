import { PeopleProfile } from "@/components/site/PeopleProfile";
import { PRINCIPAL } from "@/lib/aboutContent";

const Principal = () => (
  <PeopleProfile
    eyebrow="Administration"
    title="Principal's Message"
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Principal" }]}
    {...PRINCIPAL}
  />
);

export default Principal;
