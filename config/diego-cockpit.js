export const diegoCockpit = {
  name: 'Diego Cockpit',
  repo: 'diego-web',
  abbreviation: 'dgo',
  primaryColor: '#008a74',
  jenkins: 'https://jenkins-prod.compute-uk.scalable.capital/view/diego-web-pipeline/',
  datadogBL: 'https://scalablecapital.datadoghq.com/logs?query=service%3Adiego-web-cockpit-browser&index=&from_ts=1632471542598&to_ts=1632475142598&live=true',
  envs: [
    {
      name: 'Localhost',
      port: 3033,
      devScript: 'yarn cockpit dev',
      pollTime: 6 * 1000,
      healthyHref: 'http://localhost:3033/healthy',
      links: [
        {
          name: 'Cockpit Login',
          href: 'http://localhost:3033'
        }, {
          name: 'Cockpit Shortcuts',
          href: 'http://localhost:3033/shortcuts'
        }
      ]
    },
    {
      name: 'Dev',
      pollTime: 5 * 60 * 1000,
      healthyHref: 'https://dev-diego.scalable.capital/cockpit/healthy',
      links: [
        {
          name: 'Cockpit Login',
          href: 'https://dev-diego.scalable.capital/cockpit/login'
        }, {
          name: 'Cockpit Shortcuts',
          href: 'https://dev-diego.scalable.capital/cockpit/shortcuts'
        }
      ]
    },
    {
      name: 'Test',
      pollTime: 10 * 60 * 1000,
      links: [
        {
          name: 'Cockpit Login',
          href: 'https://web.uat-diego.scalable.capital/cockpit/'
        }
      ]
    },
    {
      name: 'Prod',
      pollTime: 15 * 60 * 1000,
      healthyHref: 'https://app.gerd-kommer-capital.de/cockpit/healthy',
      links: [
        {
          name: 'Cockpit Login',
          href: 'https://app.gerd-kommer-capital.de/cockpit/login/'
        }
      ]
    }
  ]
};
