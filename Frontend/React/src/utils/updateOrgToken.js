export const updateOrgToken = () => {
  const organization = localStorage.getItem("organization");
  if (organization) {
    const parseOrganization = JSON.parse(organization);
    return parseOrganization.token;
  }
};
