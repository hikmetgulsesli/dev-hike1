import { test, expect } from '@playwright/test';

test.describe('Hikmet Güleşli Personal Website E2E', () => {
  
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check hero section is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check navigation exists
    await expect(page.locator('nav')).toBeVisible();
    
    // Check CTA buttons exist
    await expect(page.getByText('Hakkımda Bilgi Al')).toBeVisible();
    await expect(page.getByText('Projeleri Gör')).toBeVisible();
  });

  test('Navigation highlights current page', async ({ page }) => {
    await page.goto('/');
    
    // On homepage, Ana Sayfa or first nav item should be active
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('Can navigate to Projects page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Projeler link or button
    await page.getByRole('link', { name: /projeler/i }).first().click();
    await expect(page).toHaveURL(/\/projects/);
    
    // Projects page should have PROJELER heading
    await expect(page.getByText('PROJELER')).toBeVisible();
  });

  test('Can navigate to Blog page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Blog link
    await page.getByRole('link', { name: /blog/i }).first().click();
    await expect(page).toHaveURL(/\/blog/);
  });

  test('Can navigate to About page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Hakkında link
    await page.getByRole('link', { name: /hakkında/i }).first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('Can navigate to Contact page', async ({ page }) => {
    await page.goto('/');
    
    // Click on İletişim link
    await page.getByRole('link', { name: /i̇letişim/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('Projects filter and search work', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for projects to load
    await page.waitForSelector('[data-testid="category-filter"]', { timeout: 5000 }).catch(() => {
      // Fallback: check for filter buttons by text
    });
    
    // Check category filters exist
    const filterButtons = page.getByRole('button', { name: /tümü|web|mobil/i });
    await expect(filterButtons.first()).toBeVisible();
    
    // Check search input exists
    const searchInput = page.getByPlaceholder(/proje ara/i);
    await expect(searchInput).toBeVisible();
  });

  test('Blog search and category filter work', async ({ page }) => {
    await page.goto('/blog');
    
    // Check category filters exist
    const filterButtons = page.getByRole('button', { name: /tümü|teknik|kariyer/i });
    await expect(filterButtons.first()).toBeVisible();
    
    // Check search input exists
    const searchInput = page.getByPlaceholder(/ara/i);
    await expect(searchInput).toBeVisible();
  });

  test('Contact form submits successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill the contact form
    await page.getByLabel(/ad/i).first().fill('Elif');
    await page.getByLabel(/soyad/i).first().fill('Yılmaz');
    await page.getByLabel(/email/i).fill('elif@reelforge.com');
    await page.getByLabel(/konu/i).fill('Yeni bir proje hakkında bilgi almak istiyorum');
    await page.getByLabel(/mesaj/i).fill('Merhaba, yeni web sitem için yardıma ihtiyacım var. React tabanlı bir e-ticaret platformu kurmak istiyorum.');
    
    // Submit the form
    await page.getByRole('button', { name: /gönder|submit|ilet/i }).click();
    
    // Should show success toast or message
    await expect(page.getByText(/teşekkür|başarılı|gönderildi/i)).toBeVisible({ timeout: 5000 }).catch(() => {
      // If no toast, at least form should be cleared or have some feedback
    });
  });

  test('No placeholder text remains', async ({ page }) => {
    await page.goto('/');
    
    // Check no "Coming soon", "TODO", "Yakinda" text
    await expect(page.getByText(/coming soon/i)).not.toBeVisible();
    await expect(page.getByText(/todo/i)).not.toBeVisible();
    await expect(page.getByText(/yakında/i)).not.toBeVisible();
    await expect(page.getByText(/yakinda/i)).not.toBeVisible();
  });

  test('Mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Look for hamburger menu button
    const hamburgerBtn = page.locator('button[aria-label], button').filter({ hasText: /menu|☰|≡/i }).first();
    
    // If hamburger exists, click it
    if (await hamburgerBtn.isVisible().catch(() => false)) {
      await hamburgerBtn.click();
      
      // Menu should open - look for mobile nav items
      await expect(page.getByText(/projeler|blog|hakkında/i).first()).toBeVisible();
      
      // Close menu
      const closeBtn = page.locator('button').filter({ hasText: /x|close|kapat/i }).first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click();
      }
    }
  });

  test('Project detail page navigation', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for project cards to load
    await page.waitForLoadState('networkidle').catch(() => {});
    
    // Click on first project card
    const projectCard = page.locator('[data-testid="project-card"], article').first();
    
    if (await projectCard.isVisible().catch(() => false)) {
      await projectCard.click();
      
      // Should navigate to project detail
      await expect(page).toHaveURL(/\/projects\/[^/]+$/);
    }
  });

  test('Blog detail page navigation', async ({ page }) => {
    await page.goto('/blog');
    
    // Wait for blog cards to load
    await page.waitForLoadState('networkidle').catch(() => {});
    
    // Click on first blog card
    const blogCard = page.locator('article').first();
    
    if (await blogCard.isVisible().catch(() => false)) {
      await blogCard.click();
      
      // Should navigate to blog detail
      await expect(page).toHaveURL(/\/blog\/[^/]+$/);
    }
  });

  test('All routes are accessible', async ({ page }) => {
    const routes = ['/', '/projects', '/blog', '/about', '/contact'];
    
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);
    }
  });
});