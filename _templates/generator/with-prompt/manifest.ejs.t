---
to: "<%= features.includes('Manifest') ?  directory + '/manifest.json' : null %>"
---
<% if(features.includes('Manifest')) { %>
{
  "short_name": "<%= name %>",
  "icons": [
    {
      "src": "<%= iconLarge %>",
      "type": "image/<%- iconLarge.split('.').pop() %>",
      "sizes": "512x512"
    },
    {
      "src": "<%= icon  %>",
      "type": "image/<%- icon.split('.').pop() %>",
      "sizes": "192x192"
    }
  ],
  "display": "<%= display %>",
  <%- orientation === 'any' ? null : '"orientation": "' + orientation + '",' %>
  "start_url": "<%= startUrl %>",
  "theme_color": "<%= themeColor %>",
  "background_color": "<%= backgroundColor %>"
}
<% } %>