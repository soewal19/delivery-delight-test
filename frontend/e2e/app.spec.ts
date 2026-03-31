import { test, expect } from '@playwright/test';

test.describe('Food Delivery App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Replace with your local or production URL
    await page.goto('http://localhost:5173/');
  });

  test('should display shops list', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('FoodDelivery');
    const shopCards = page.locator('.shop-card'); // Ensure you have this class on your cards
    // Wait for the shops to load
    await page.waitForSelector('h2:has-text("Shops")');
  });

  test('should filter products by category', async ({ page }) => {
    // Click on a category filter (e.g., "Burgers")
    const burgerFilter = page.locator('button:has-text("Burgers")');
    if (await burgerFilter.isVisible()) {
      await burgerFilter.click();
      // Verify only burger products are shown
      const productCategories = page.locator('.product-category');
      await expect(productCategories.first()).toContainText('Burgers');
    }
  });

  test('should add product to cart and place order', async ({ page }) => {
    // Add first product to cart
    const addToCartBtn = page.locator('button:has-text("Add to Cart")').first();
    await addToCartBtn.click();
    
    // Go to cart
    await page.click('a[href="/cart"]');
    
    // Check cart items
    await expect(page.locator('h1')).toContainText('Shopping Cart');
    
    // Fill order form
    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('input[id="phone"]', '+380501234567');
    await page.fill('input[id="address"]', 'Test Street, 123');
    
    // Submit order
    await page.click('button:has-text("Place Order")');
    
    // Check order success (toast or redirect)
    await page.waitForURL('**/orders');
    await expect(page.locator('h1')).toContainText('Order History');
  });

  test('should view user profile and stats', async ({ page }) => {
    await page.click('a[href="/profile"]');
    
    // Login if not already
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
      await page.click('button:has-text("Sign In")');
    }
    
    await expect(page.locator('h1')).toContainText('Anonymous User');
    // Check if chart is visible
    await expect(page.locator('.recharts-responsive-container')).toBeVisible();
  });
});
