> APIs are still under development and are subjected to change

# Introduction
> Reactor is a static site generator based on React, it allows developers to use existing 
  knowledge from familiar framework such as `React` and `react-router`
  
# Getting Started

1. `npm install -g reactor-js`
2. `reactor init <name>`
3. `cd <name> && npm install`
4. `reactor serve`

Routes are defined in `routes.js`
``` js
const routes = (
    <Route component={Base} path="/">
      <IndexRoute component={Home} />
      <Route component={Home} path="index" />
     <Route component={Blog} path="blog">
        {blogPostRoutes}
      </Route>
      <Route component={AboutMe} path="about" />
     <Route component={Projects} path="projects" />
     <Route component={NotFound} path="*" />
   </Route>
);

export default routes
```


