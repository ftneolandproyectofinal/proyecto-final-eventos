import { useEffect, useState } from "react";
import useOrganizations from "./useOrganizations";
import { favOrganization } from "../../services/user.service";

export const useFollowOrg = (id) => {
  const organizations = useOrganizations();
  const [isLoadingFollow, setIsLoadingFollow] = useState(true);
  const [isFollowing, setIsFollowing] = useState(
    organizations?.some(({ _id }) => id === _id),
  );

  useEffect(() => {
    setIsLoadingFollow(false);
    setIsFollowing(organizations?.some(({ _id }) => id === _id));
  }, [organizations, id]);
  const handleFollow = () => {
    setIsLoadingFollow(true);
    favOrganization(id).then(() => {
      setIsLoadingFollow(false);
      setIsFollowing(() => !isFollowing);
    });
  };

  return { isFollowing, handleFollow, isLoadingFollow };
};
