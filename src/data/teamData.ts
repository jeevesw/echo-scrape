// TODO: Client to supply team members
// and headshots per service page.

export type ServiceSlug =
  | "paid-advertising"
  | "paid-search"
  | "social-media-management"
  | "tiktok-production"
  | "creative-services"
  | "website-design";

export interface TeamMember {
  /** Must match the author name stored in the database */
  name: string;
  services: ServiceSlug[];
}

/**
 * Canonical team roster with service assignments.
 * The `name` field is matched against the `authors` table at render time.
 * Order here determines display order on every service page.
 */
export const teamMembers: TeamMember[] = [
  {
    name: "Kitty",
    services: [
      "paid-advertising",
      "paid-search",
      "social-media-management",
      "creative-services",
    ],
  },
  {
    name: "Dani",
    services: [
      "paid-advertising",
      "paid-search",
      "social-media-management",
    ],
  },
  {
    name: "Lily",
    services: [
      "social-media-management",
      "tiktok-production",
      "creative-services",
    ],
  },
  {
    name: "Ashley",
    services: [
      "tiktok-production",
      "creative-services",
      "website-design",
    ],
  },
  {
    name: "Jeeves",
    services: [
      "paid-advertising",
      "paid-search",
      "website-design",
    ],
  },
];

/** Return the ordered list of author names for a given service slug. */
export function getTeamForService(slug: ServiceSlug): string[] {
  return teamMembers
    .filter((m) => m.services.includes(slug))
    .map((m) => m.name);
}
