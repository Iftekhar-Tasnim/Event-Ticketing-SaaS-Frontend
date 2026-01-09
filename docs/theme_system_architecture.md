# Theme System Architecture & Implementation Plan

## 1. Upgrade Overview

The Theme System allows **Platform Admins** to release standard "Master Themes" (Templates) and **Tenant Admins** to apply, customize, and manage content for their specific storefronts.

### Core Workflows
1.  **Platform Admin (Provider)**:
    *   Creates/Uploads a Theme.
    *   Defines default styles (Primary color, font, layout mode).
    *   Sets "Premium" status and Pricing.
2.  **Tenant Admin (Consumer)**:
    *   Browses available themes in Dashboard.
    *   Selects/Buys a theme.
    *   **Customizes**:
        *   **Branding**: Uploads Logo, Banner/Hero Images.
        *   **Content**: Updates Title, Description, Social Links.
        *   **Styles**: Overrides Theme Colors (if allowed).
        *   **Event Info**: Configures how events/tickets are displayed.

---

## 2. Database Schema Design

We need two layers: The **Master Theme** (Template) and the **Tenant's Instance** (Configuration).

### A. Theme Entity (Master Template)
*Managed by Platform Admin*
Already partially implemented. Stores the defaults.

```typescript
@Entity('themes')
export class ThemeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "Midnight Pro"

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string; // active, draft, archived

  @Column({ default: false })
  isPremium: boolean;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ type: 'jsonb', default: {} })
  defaultProperties: {
    colors: { primary: string; secondary: string; background: string; text: string };
    fonts: { heading: string; body: string };
    layout: string; // 'grid', 'list', 'hero-focus'
  };

  @Column({ nullable: true })
  thumbnailUrl: string; // Preview image for the theme gallery
}
```

### B. Tenant Config Entity (The "Site" Settings)
*Managed by Tenant Admin*
This entity links a Tenant to a Theme and stores their specific content.

```typescript
@Entity('tenant_configs')
export class TenantConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string; // Link to Tenant

  @ManyToOne(() => ThemeEntity)
  @JoinColumn({ name: 'themeId' })
  theme: ThemeEntity; // The selected master theme

  @Column()
  themeId: string;

  // Visual Overrides (merged with Theme.defaultProperties)
  @Column({ type: 'jsonb', default: {} })
  styleOverrides: {
    colors?: { primary?: string; secondary?: string };
    fonts?: { heading?: string };
  };

  // Tenant Content & Assets
  @Column({ type: 'jsonb', default: {} })
  assets: {
    logoUrl?: string; // Uploaded Logo
    heroBannerUrl?: string; // Uploaded Banner
    faviconUrl?: string;
  };

  // Site Information
  @Column({ type: 'jsonb', default: {} })
  siteInfo: {
    title: string;
    description: string;
    contactEmail: string;
    socialLinks: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };

  // Feature Configuration
  @Column({ type: 'jsonb', default: {} })
  eventConfig: {
    showTicketCount: boolean;
    currencyDisplay: string;
    bookingButtonText: string;
  };
}
```

---

## 3. Implementation Phases

### Phase 1: Platform Admin (Current Focus)
**Goal:** Enable Platform Admin to define the "Master Themes".

1.  **Refine Backend `ThemeEntity`**: Ensure `defaultProperties` structure is flexible but standardized.
2.  **Refine Admin UI (`/admin/themes`)**:
    *   **Create Modal**: Add fields for `price`, `thumbnailUrl`.
    *   **Properties Editor**: A JSON editor or simple form inputs to set default Colors/Fonts for the template.
    *   **Preview**: Show a card representation of the theme.

### Phase 2: Tenant Implementation (Next)
**Goal:** Enable Tenant to pick and edit.

1.  **Tenant Dashboard Page (`/tenant/design`)**:
    *   **Theme Gallery**: Grid showing all `active` themes.
    *   **Live Preview**: Using the selected theme with dummy data.
2.  **Editor interface**:
    *   **Sidebar**: Tabs for "Branding", "Colors", "Social", "Events".
    *   **Real-time Preview**: updates as they edit properties (using a Preview Component that mimics the public site).
3.  **Public Site Rendering**:
    *   Dynamic route (e.g., `[tenantSlug]/page.tsx` or subdomain).
    *   Fetches `TenantConfig`.
    *   Applies CSS variables based on `styleOverrides`.
    *   Renders content from `siteInfo`.

---

## 4. Admin Section Work Plan (Immediate)

1.  **Database Migration**: Update `ThemeEntity` to strictly define `defaultProperties` structure (Backend).
2.  **DTO Updates**: Update `CreateThemeDto` to validate the nested properties structure.
3.  **Frontend Update**: Enhance `CreateThemeModal` to support adding a "Thumbnail URL" and defining "Default Colors" clearly.
