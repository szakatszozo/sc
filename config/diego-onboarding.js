export const diegoOnboarding =   {
  name: 'Diego Onboarding',
  repo: 'diego-web',
  abbreviation: 'dgo',
  primaryColor: '#008a74',
  jenkins: 'https://jenkins-prod.compute-uk.scalable.capital/view/diego-web-pipeline/',
  datadogBL: 'https://scalablecapital.datadoghq.com/logs?query=service%3Adiego-web-onboarding-browser&index=&from_ts=1632471542598&to_ts=1632475142598&live=true',
  envs: [
    {
      name: 'Localhost',
      port: 7073,
      devScript: 'yarn onboarding dev',
      pollTime: 60 * 1000,
      healthyHref: 'http://localhost:7073/healthy',
      links: [
        {
          name: 'Start Onboarding',
          href: 'http://localhost:7073'
        },
        {
          name: 'Onboarding Shortcuts',
          href: 'http://localhost:7073/shortcuts'
        }
      ]
    },
    {
      name: 'Dev',
      pollTime: 5 * 60 * 1000,
      healthyHref: 'https://dev-diego.scalable.capital/onboarding/healthy',
      links: [
        {
          name: 'Start Onboarding',
          href: 'https://dev-diego.scalable.capital/onboarding'
        },
        {
          name: 'Onboarding Shortcuts',
          href: 'https://dev-diego.scalable.capital/onboarding/shortcuts'
        }
      ]
    },
    {
      name: 'Test',
      pollTime: 10 * 60 * 1000,
      links: [
        {
          name: 'Onboarding Shortcuts',
          href: 'https://web.uat-diego.scalable.capital/onboarding/'
        }
      ]
    },
    {
      name: 'Prod',
      pollTime: 15 * 60 * 1000,
      healthyHref: 'https://app.gerd-kommer-capital.de/onboarding/healthy',
      links: [
        {
          name: 'Start Onboarding',
          href: 'https://app.gerd-kommer-capital.de/onboarding/'
        }
      ]
    }
  ]
};
