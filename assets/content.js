/* Publish URLs when the corresponding report, presentation or data package is ready. */
const CONFIG = {
  team: [
    {name:'Giorgio Galdiolo',role:'MSc Finance · USI',photo:''},
    {name:'Alessandro Maugeri',role:'MSc Finance · USI',photo:''},
    {name:'Stefano Martino',role:'MSc Finance · USI',photo:''},
    {name:'Giorgio Ferretto',role:'MSc Finance · USI',photo:''},
    {name:'Raffaele Sicolo',role:'MSc Finance · USI',photo:''}
  ],
  docs: {
    r1: [
      {title:'Strategic Asset Allocation — Report',desc:'Market outlook, ETF selection, capped risk-budget weights, backtests and classroom checkpoints.',type:'Report',status:'Analytical draft',url:''},
      {title:'Round 1 Presentation',desc:'The investment case and the evidence supporting our strategic allocation.',type:'Slides',status:'In preparation',url:''},
      {title:'Code & Data',desc:'The Python notebook, input data and documented research configurations.',type:'Data & Code',status:'Publication pending',url:''}
    ],
    r2: [
      {title:'Discretionary Equity — Report',desc:'Stock research and the tactical allocation relative to our strategic core.',type:'Report',status:'Planned',url:''},
      {title:'Round 2 Presentation',desc:'Round 1 performance and the investment case for the next round.',type:'Slides',status:'Planned',url:''}
    ],
    r3: [
      {title:'Quantitative & Macro — Report',desc:'The quantitative strategy, macroeconomic view and portfolio risk budget.',type:'Report',status:'Planned',url:''},
      {title:'Round 3 Presentation',desc:'Performance review and the final-round investment proposals.',type:'Slides',status:'Planned',url:''},
      {title:'Code & Data',desc:'Code and data supporting the quantitative strategy.',type:'Data & Code',status:'Planned',url:''}
    ]
  },
  /* Leave live values empty until verified Bloomberg performance is available. */
  performance:{asOf:'',ret:'—',vol:'—',sharpe:'—',mdd:'—'}
};
