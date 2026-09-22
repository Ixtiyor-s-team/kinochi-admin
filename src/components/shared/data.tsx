import {
  ChartBarIcon,
  FolderIcon,
  ListBulletsIcon,
  NewspaperClippingIcon,
  TagIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { PATHS } from "../../lib/paths";

export const sidebarItems = [
  {
    icon: <ChartBarIcon />,
    title: "Dashboard",
    href: PATHS.DASHBOARD,
  },
  {
    icon: <NewspaperClippingIcon />,
    title: "Yangiliklar",
    href: PATHS.NEWS,
  },
  {
    icon: <ListBulletsIcon />,
    title: "Kategoriyalar",
    href: PATHS.CATEGORIES,
  },
  {
    icon: <TagIcon />,
    title: "Teglar",
    href: PATHS.TAGS,
  },
  {
    icon: <UsersIcon />,
    title: "Adminlar",
    href: PATHS.ADMINS,
  },
];
