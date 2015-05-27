var test_config = {
  resources: {
    'dosh': {name: 'Dosh', description: 'Money money money'}
  },
  generators: {
    '9mm': {  name: '9mm',
              description: 'Standard issue nine millimeter pistol',
              base_cost: {
                'dosh': 1
              },
              produces: {
                'dosh': {base: 1, at: 1, add: 0, mult: 1}
              },
              cost_fn: function(n) { return n+1; }
    },
    'm4': {   name: 'm4',
              description: 'A soldier\'s best friend',
              base_cost: {
                'dosh': 50
              },
              produces: {
                'dosh': {base: 10, at: 10, add: 0, mult: 1}
              },
              cost_fn: function(n) { return 50 * Math.pow(1.15, n) }
    }
  },
  upgrades: {
    'exp_rounds': {
      name: 'Explosive Rounds',
      description: 'Everything\'s better with more explosions',
      costs: {
        'dosh': 1000
      },
      effect: {
        target: 'm4',
        prop: 'produces',
        resource: 'dosh',
        add: 0.5,
        mult: 1
      }
    },
    '3d_printing': {
      name: '3D Printers',
      description: 'Plastic pistols: half the cost, double the fun',
      costs: {
        'dosh': 10000
      },
      effect: {
        target: '9mm',
        prop: 'costs',
        resource: 'dosh',
        add: 0,
        mult: 0.5
      }
    }
  }
};
