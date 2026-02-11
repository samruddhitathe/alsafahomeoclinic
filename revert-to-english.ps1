# PowerShell script to revert components to English (remove useLanguage)

$files = @(
    "components/About.tsx",
    "components/ContactLocation.tsx", 
    "components/ExperienceTimeline.tsx",
    "components/Footer.tsx",
    "components/Gallery.tsx",
    "components/HealingStories.tsx",
    "components/Philosophy.tsx",
    "components/Testimonials.tsx",
    "components/WhyHomeopathyAccordion.tsx"
)

foreach ($file in $files) {
    Write-Host "Processing $file..."
    
    # Read file content
    $content = Get-Content $file -Raw
    
    # Remove useLanguage import
    $content = $content -replace "import \{ useLanguage \} from '\.\./contexts/LanguageContext';\r?\n", ""
    
    # Remove const { t } = useLanguage();
    $content = $content -replace "\s*const \{ t \} = useLanguage\(\);\r?\n", ""
    
    # Note: Manual replacement of t() calls needed - see fix-components.md
    
    Write-Host "Cleaned imports from $file"
}

Write-Host "`nIMPORTANT: You still need to manually replace t('key') calls with English text in each file."
Write-Host "See fix-components.md for the list of files and instructions."