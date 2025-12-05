# Screenshots Directory

Add your deployment screenshots here.

## Required Screenshots

1. **github-actions.png**
   - Go to your GitHub repository
   - Click on "Actions" tab
   - Take a screenshot showing successful workflow runs (green checkmarks)

2. **frontend.png**
   - Open your deployed frontend application
   - Take a screenshot of the main page

3. **health-check.png**
   - Visit your backend health endpoint: `https://your-backend.onrender.com/health`
   - Take a screenshot of the JSON response

4. **monitoring.png**
   - Go to your UptimeRobot dashboard
   - Take a screenshot showing your monitors

5. **backend-dashboard.png**
   - Go to your Render dashboard
   - Take a screenshot of your deployed service

6. **frontend-dashboard.png**
   - Go to your Vercel dashboard
   - Take a screenshot of your deployed project

## Tips for Good Screenshots

- Use full screen or maximize window
- Ensure URLs are visible
- Show successful status (green indicators)
- Crop out unnecessary parts
- Use PNG format for better quality
- Keep file sizes reasonable (< 2MB each)

## How to Add Screenshots

1. Take screenshots using:
   - Windows: `Win + Shift + S`
   - Mac: `Cmd + Shift + 4`

2. Save them in this directory with the exact names listed above

3. Reference them in your README.md:
   ```markdown
   ![Description](screenshots/filename.png)
   ```

## Example

```markdown
### CI/CD Pipeline
![GitHub Actions Workflow](screenshots/github-actions.png)
*GitHub Actions CI/CD pipeline running successfully*
```
