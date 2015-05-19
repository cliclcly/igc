var test_config = {
  resources: { name: 'Dosh', description: 'Money money money'},
  automatics: {
    '9mm': {  name: '9mm',
              description: 'Standard issue nine millimeter pistol',
              base_cost: 1,
              produces: {
                'dosh': {base: 1, at: 1, add: 0, mult: 1}
              },
              cost_fn: function(n) { return n+1; }
    },
    'm4': {   name: 'm4',
              description: 'A soldier\'s best friend',
              base_cost: 50,
              produces: {
                'dosh': {base: 10, at: 10, add: 0, mult: 1}
              },
              cost_fn: function(n) { return 10 * Math.pow(1.15, n+1) }
    }
  },
  upgrades: {
    'exp_rounds': {
      name: 'Explosive Rounds',
      description: 'Everything\'s better with more explosions',
      cost: 1000,
      effect: {
        target: 'm4',
        prop: 'produces',
        resource: 'dosh',
        add: 0.5,
        mult: 1
      }
    }
  }
};
