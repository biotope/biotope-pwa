# Manifest

## What is it about?
The PWA manifest is a JSON file that tells the browser about the web application (name, icons, description etc.)  and how it should behave when ‘installed’ on the user’s device. It enables functionalities like a custom splash screen, make the PWA installable on the home screen and add a fullscreen feature.

## When should you use it?
The Manifest File is essential for a PWA. You should use it for every Website and Application, if you want to call it a PWA.

## How to use it?
To add a manifest just use our generator `npx @biotope/cli pwa` and choose the feature `Manifest` or any generic [manifest generator on the web](https://app-manifest.firebaseapp.com/).

In case you use our generator, you have to answer the following questions:

[**name:**](https://developer.mozilla.org/en-US/docs/Web/Manifest/name) The name attribute is a string that represents the name of the web application

[**display:**](https://developer.mozilla.org/en-US/docs/Web/Manifest/display) Determines the display mode for the website.

[**orientation:**](https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation) Defines the default orientation for all the website's top-level browsing contexts.

[**theme color:**](https://developer.mozilla.org/en-US/docs/Web/Manifest/theme_color) Defines the default theme color for the application. This sometimes affects how the OS displays the site (e.g., on Android's task switcher, the theme color surrounds the site).

[**background color:**](https://developer.mozilla.org/en-US/docs/Web/Manifest/background_color) Defines a placeholeder background color for the application page to display before its stylesheet is loaded.

[**icons:**](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons) Representing image files that can serve as application iconsfor different contexts. You have to define a small one (192x192) and a large one (512x512).

[**start URL:**](https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url) Represents the start URL of the web application — the prefered URL that should be loaded when the user launches the web application.

**Directory:** The directory, where the manifest.json file will be generated.
