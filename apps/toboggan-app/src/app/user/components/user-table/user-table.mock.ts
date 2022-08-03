import { TableRow } from '@snhuproduct/toboggan-ui-components-library/lib/table/table-data';

//TODO: UI-components type is outdated! cellData is JSONObject there and causes a type mismatch here.

export const dynamicRowData: TableRow[] = [
  {
    rowId: '1',
    cellData: {
      sequence: 1,
      first: 'Mark',
      last: 'Otto',
      mail: ['gp-icon-mail', 'mdo'],
      lock: ['gp-icon-lock', 'text'],
      status: 'Active',
      menu: {
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
      fixedMenu: {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    },
  },
  {
    rowId: '2',
    cellData: {
      sequence: 2,
      first: 'Jacob',
      last: 'Thornton',
      mail: ['gp-icon-mail', 'f'],
      lock: ['gp-icon-lock', 'text'],
      status: 'Active',
      menu: {
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
      fixedMenu: {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    },
  },
  {
    rowId: '3',
    cellData: {
      sequence: 3,
      first: 'Larry the Bird',
      last: '',
      mail: ['gp-icon-mail', 'lry'],
      lock: ['gp-icon-lock', 'text'],
      status: 'Active',
      menu: {
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
      fixedMenu: {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    },
  },
  {
    rowId: '4',
    cellData: {
      sequence: 4,
      first: 'Fourth',
      last: 'Person',
      mail: ['gp-icon-mail', 'lry'],
      lock: ['gp-icon-lock', 'text'],
      status: 'Inactive',
      menu: {
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
      fixedMenu: {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    },
  },
  {
    rowId: '5',
    cellData: {
      sequence: 5,
      first: 'Fifth',
      last: 'Person',
      mail: ['gp-icon-mail', 'lry'],
      lock: ['gp-icon-lock', 'text'],
      status: 'Inactive',
      menu: {
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
      fixedMenu: {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    },
  },
];

export const userRowData: TableRow[] = [
  {
    rowId: '1',
    cellData: {
      firstName: 'Steve',
      lastName: 'Graves',
      email: 'hizce@va.sg',
      status: 'Inactive',
    },
  },
  {
    rowId: '2',
    cellData: {
      firstName: 'Bruce',
      lastName: 'Joseph',
      email: 'woh@gibramot.cu',
      status: 'Inactive',
    },
  },
  {
    rowId: '3',
    cellData: {
      firstName: 'Willie',
      lastName: 'Meyer',
      email: 'hainba@fivugi.je',
      status: 'Inactive',
    },
  },
  {
    rowId: '4',
    cellData: {
      firstName: 'Duane',
      lastName: 'Miles',
      email: 'hekenope@be.lb',
      status: 'Inactive',
    },
  },
  {
    rowId: '5',
    cellData: {
      firstName: 'Rebecca',
      lastName: 'Palmer',
      email: 'buzzul@sinutade.eh',
      status: 'Inactive',
    },
  },
  {
    rowId: '6',
    cellData: {
      firstName: 'Michael',
      lastName: 'Hunt',
      email: 'ni@jug.sy',
      status: 'Active',
    },
  },
  {
    rowId: '7',
    cellData: {
      firstName: 'Curtis',
      lastName: 'Cole',
      email: 'azkef@filsuju.lv',
      status: 'Active',
    },
  },
  {
    rowId: '8',
    cellData: {
      firstName: 'Michael',
      lastName: 'Ballard',
      email: 'zu@netasoca.sa',
      status: 'Active',
    },
  },
  {
    rowId: '9',
    cellData: {
      firstName: 'Nannie',
      lastName: 'Drake',
      email: 'relocec@pe.rs',
      status: 'Active',
    },
  },
  {
    rowId: '10',
    cellData: {
      firstName: 'Jeremiah',
      lastName: 'Rios',
      email: 'rihigzus@kuod.am',
      status: 'Active',
    },
  },
  {
    rowId: '11',
    cellData: {
      firstName: 'Adeline',
      lastName: 'Roberson',
      email: 'po@ogecujas.et',
      status: 'Active',
    },
  },
  {
    rowId: '12',
    cellData: {
      firstName: 'Jose',
      lastName: 'Tate',
      email: 'po@pag.by',
      status: 'Active',
    },
  },
  {
    rowId: '13',
    cellData: {
      firstName: 'Leo',
      lastName: 'Rivera',
      email: 'vakdu@tuejred.mp',
      status: 'Active',
    },
  },
  {
    rowId: '14',
    cellData: {
      firstName: 'Cecilia',
      lastName: 'Gibbs',
      email: 'em@jakim.fo',
      status: 'Active',
    },
  },
  {
    rowId: '15',
    cellData: {
      firstName: 'Steve',
      lastName: 'Padilla',
      email: 'kumvud@jawuve.ro',
      status: 'Active',
    },
  },
  {
    rowId: '16',
    cellData: {
      firstName: 'Hallie',
      lastName: 'Logan',
      email: 'wuloni@kuwep.mu',
    },
  },
  {
    rowId: '17',
    cellData: {
      firstName: 'Gregory',
      lastName: 'Powell',
      email: 'nelew@witivge.sb',
    },
  },
  {
    rowId: '18',
    cellData: { firstName: 'Chad', lastName: 'Wade', email: 'kigjuha@su.md' },
  },
  {
    rowId: '19',
    cellData: { firstName: 'Kevin', lastName: 'Hayes', email: 'weonova@mo.sd' },
  },
  {
    rowId: '20',
    cellData: {
      firstName: 'Gerald',
      lastName: 'Woods',
      email: 'tecdub@web.mk',
    },
  },
  {
    rowId: '21',
    cellData: { firstName: 'Willie', lastName: 'Webb', email: 'vezmohe@bu.cd' },
  },
  {
    rowId: '22',
    cellData: { firstName: 'Isaac', lastName: 'Valdez', email: 'ov@gomnuc.ie' },
  },
  {
    rowId: '23',
    cellData: { firstName: 'Albert', lastName: 'Hunt', email: 'ni@ceufti.sh' },
  },
  {
    rowId: '24',
    cellData: { firstName: 'Sophie', lastName: 'Cobb', email: 'kiwzok@fe.kg' },
  },
  {
    rowId: '25',
    cellData: {
      firstName: 'Alan',
      lastName: 'Green',
      email: 'tubisvim@lupsigo.mc',
    },
  },
  {
    rowId: '26',
    cellData: { firstName: 'Frank', lastName: 'Dixon', email: 'tip@laz.gov' },
  },
  {
    rowId: '27',
    cellData: {
      firstName: 'Clarence',
      lastName: 'Wilkins',
      email: 'wilugez@jakgegane.ro',
    },
  },
  {
    rowId: '28',
    cellData: {
      firstName: 'Rhoda',
      lastName: 'Adkins',
      email: 'ansap@piguv.gw',
    },
  },
  {
    rowId: '29',
    cellData: {
      firstName: 'Lawrence',
      lastName: 'Ford',
      email: 'ko@iheeccaj.kz',
    },
  },
  {
    rowId: '30',
    cellData: {
      firstName: 'Jean',
      lastName: 'Stevens',
      email: 'muzpokav@jotelem.tz',
    },
  },
  {
    rowId: '31',
    cellData: {
      firstName: 'Margaret',
      lastName: 'McGuire',
      email: 'ek@retjeh.no',
    },
  },
  {
    rowId: '32',
    cellData: {
      firstName: 'Jason',
      lastName: 'Willis',
      email: 'ezaoctaf@tek.edu',
    },
  },
  {
    rowId: '33',
    cellData: {
      firstName: 'Don',
      lastName: 'Huff',
      email: 'ipfehje@wovgune.kw',
    },
  },
  {
    rowId: '34',
    cellData: {
      firstName: 'Josephine',
      lastName: 'Brown',
      email: 'tismibla@fa.pf',
    },
  },
  {
    rowId: '35',
    cellData: { firstName: 'Lydia', lastName: 'Hill', email: 'kuza@moata.az' },
  },
  {
    rowId: '36',
    cellData: {
      firstName: 'Nettie',
      lastName: 'Parsons',
      email: 'naca@hotpehjul.sr',
    },
  },
  {
    rowId: '37',
    cellData: {
      firstName: 'Chad',
      lastName: 'Brady',
      email: 'cusajzu@biote.so',
    },
  },
  {
    rowId: '38',
    cellData: {
      firstName: 'Delia',
      lastName: 'Morales',
      email: 'ubuj@honezni.jo',
    },
  },
  {
    rowId: '39',
    cellData: {
      firstName: 'Marguerite',
      lastName: 'Miller',
      email: 'rahode@fud.km',
    },
  },
  {
    rowId: '40',
    cellData: {
      firstName: 'Adelaide',
      lastName: 'Lloyd',
      email: 'la@tunge.ax',
    },
  },
  {
    rowId: '41',
    cellData: {
      firstName: 'Willie',
      lastName: 'Cummings',
      email: 'torise@re.gw',
    },
  },
  {
    rowId: '42',
    cellData: {
      firstName: 'Randy',
      lastName: 'Harrington',
      email: 're@uco.ls',
    },
  },
  {
    rowId: '43',
    cellData: {
      firstName: 'Rhoda',
      lastName: 'McBride',
      email: 'javic@efuhozsed.vu',
    },
  },
  {
    rowId: '44',
    cellData: {
      firstName: 'Caroline',
      lastName: 'Gibson',
      email: 'mapavo@da.aq',
    },
  },
  {
    rowId: '45',
    cellData: { firstName: 'Bryan', lastName: 'Poole', email: 'pe@ahu.fk' },
  },
  {
    rowId: '46',
    cellData: {
      firstName: 'Curtis',
      lastName: 'Paul',
      email: 'irapetba@afeed.tr',
    },
  },
  {
    rowId: '47',
    cellData: {
      firstName: 'Eleanor',
      lastName: 'Brock',
      email: 'wihgeg@zih.tc',
    },
  },
  {
    rowId: '48',
    cellData: {
      firstName: 'Jeff',
      lastName: 'Hansen',
      email: 'ujwe@cufleb.vi',
    },
  },
  {
    rowId: '49',
    cellData: {
      firstName: 'Caleb',
      lastName: 'Medina',
      email: 'da@vempuaz.pm',
    },
  },
  {
    rowId: '50',
    cellData: {
      firstName: 'Raymond',
      lastName: 'Lowe',
      email: 'pamori@doficuza.re',
    },
  },
  {
    rowId: '51',
    cellData: { firstName: 'Sara', lastName: 'Stokes', email: 'ke@sum.kh' },
  },
  {
    rowId: '52',
    cellData: {
      firstName: 'Henry',
      lastName: 'Collier',
      email: 'heozlu@nekwat.zw',
    },
  },
  {
    rowId: '53',
    cellData: {
      firstName: 'Ada',
      lastName: 'Estrada',
      email: 'vikmogatu@owotomu.sh',
    },
  },
  {
    rowId: '54',
    cellData: {
      firstName: 'Leonard',
      lastName: 'McCormick',
      email: 'canagoz@lora.mn',
    },
  },
  {
    rowId: '55',
    cellData: {
      firstName: 'Raymond',
      lastName: 'Riley',
      email: 'nahitoc@eduhnar.cd',
    },
  },
  {
    rowId: '56',
    cellData: { firstName: 'Lydia', lastName: 'Wright', email: 'buuta@tiw.ki' },
  },
  {
    rowId: '57',
    cellData: {
      firstName: 'Anne',
      lastName: 'Reese',
      email: 'papuzeb@nihic.tw',
    },
  },
  {
    rowId: '58',
    cellData: { firstName: 'Alma', lastName: 'Hill', email: 'paj@buclawi.at' },
  },
  {
    rowId: '59',
    cellData: {
      firstName: 'Dora',
      lastName: 'Maxwell',
      email: 'hohgefow@bi.gp',
    },
  },
  {
    rowId: '60',
    cellData: {
      firstName: 'Philip',
      lastName: 'Davis',
      email: 'sibtunmis@hivis.edu',
    },
  },
  {
    rowId: '61',
    cellData: {
      firstName: 'Aaron',
      lastName: 'Miller',
      email: 'niravsam@ve.gy',
    },
  },
  {
    rowId: '62',
    cellData: {
      firstName: 'Rachel',
      lastName: 'Wright',
      email: 'ci@verluh.de',
    },
  },
  {
    rowId: '63',
    cellData: {
      firstName: 'Leroy',
      lastName: 'Casey',
      email: 'guzjunwo@denoh.af',
    },
  },
  {
    rowId: '64',
    cellData: { firstName: 'Stanley', lastName: 'Holt', email: 'zol@alhi.sk' },
  },
  {
    rowId: '65',
    cellData: { firstName: 'Mable', lastName: 'Graham', email: 'jeaz@ev.hu' },
  },
  {
    rowId: '66',
    cellData: {
      firstName: 'Alberta',
      lastName: 'Lloyd',
      email: 'adojuhok@okamo.ae',
    },
  },
  {
    rowId: '67',
    cellData: {
      firstName: 'Willie',
      lastName: 'Robbins',
      email: 'ladikot@esazew.ma',
    },
  },
  {
    rowId: '68',
    cellData: {
      firstName: 'Ollie',
      lastName: 'Spencer',
      email: 'ichiw@ota.cl',
    },
  },
  {
    rowId: '69',
    cellData: {
      firstName: 'Martha',
      lastName: 'Boone',
      email: 'no@gerkanvo.hu',
    },
  },
  {
    rowId: '70',
    cellData: { firstName: 'Lulu', lastName: 'Obrien', email: 'sami@me.bd' },
  },
  {
    rowId: '71',
    cellData: {
      firstName: 'Eleanor',
      lastName: 'George',
      email: 'nope@tecbowu.bi',
    },
  },
  {
    rowId: '72',
    cellData: {
      firstName: 'Alexander',
      lastName: 'Nichols',
      email: 'tudizvi@uhoke.cn',
    },
  },
  {
    rowId: '73',
    cellData: {
      firstName: 'Mary',
      lastName: 'Wright',
      email: 'ovibelad@wo.ch',
    },
  },
  {
    rowId: '74',
    cellData: {
      firstName: 'Calvin',
      lastName: 'Stokes',
      email: 'ut@zozwecok.gl',
    },
  },
  {
    rowId: '75',
    cellData: {
      firstName: 'Mable',
      lastName: 'Pierce',
      email: 'esta@upuren.ee',
    },
  },
  {
    rowId: '76',
    cellData: { firstName: 'Mario', lastName: 'Bell', email: 'wuc@vosot.gg' },
  },
  {
    rowId: '77',
    cellData: {
      firstName: 'Florence',
      lastName: 'Long',
      email: 'mohnefdiz@jewo.tl',
    },
  },
  {
    rowId: '78',
    cellData: { firstName: 'Cole', lastName: 'Riley', email: 'zo@duvkev.cz' },
  },
  {
    rowId: '79',
    cellData: {
      firstName: 'Cecilia',
      lastName: 'Hall',
      email: 'robwozob@dukohopa.sy',
    },
  },
  {
    rowId: '80',
    cellData: {
      firstName: 'Harry',
      lastName: 'Gonzalez',
      email: 'idkaznet@gosuje.bv',
    },
  },
  {
    rowId: '81',
    cellData: {
      firstName: 'Luis',
      lastName: 'Lee',
      email: 'ugakaunu@wojgop.ar',
    },
  },
  {
    rowId: '82',
    cellData: {
      firstName: 'Susie',
      lastName: 'Washington',
      email: 'funottob@nozbu.my',
    },
  },
  {
    rowId: '83',
    cellData: {
      firstName: 'Beulah',
      lastName: 'Cortez',
      email: 'naluk@gunug.vc',
    },
  },
  {
    rowId: '84',
    cellData: { firstName: 'Lucas', lastName: 'Brewer', email: 'meul@ta.gf' },
  },
  {
    rowId: '85',
    cellData: {
      firstName: 'Wayne',
      lastName: 'Craig',
      email: 'sidahid@deswalmi.nr',
    },
  },
  {
    rowId: '86',
    cellData: {
      firstName: 'Essie',
      lastName: 'Brady',
      email: 'eru@ememohi.lk',
    },
  },
  {
    rowId: '87',
    cellData: {
      firstName: 'Elizabeth',
      lastName: 'Salazar',
      email: 'epucet@bonza.as',
    },
  },
  {
    rowId: '88',
    cellData: {
      firstName: 'Hilda',
      lastName: 'Leonard',
      email: 'zo@marethet.ae',
    },
  },
  {
    rowId: '89',
    cellData: {
      firstName: 'Minnie',
      lastName: 'Phillips',
      email: 'tikukkef@wodvomib.cw',
    },
  },
  {
    rowId: '90',
    cellData: {
      firstName: 'Pauline',
      lastName: 'Harris',
      email: 'gudumi@totak.bf',
    },
  },
  {
    rowId: '91',
    cellData: {
      firstName: 'Mollie',
      lastName: 'Little',
      email: 'iwfehjas@nizusru.kp',
    },
  },
  {
    rowId: '92',
    cellData: {
      firstName: 'Essie',
      lastName: 'Campbell',
      email: 'kiz@kefume.il',
    },
  },
  {
    rowId: '93',
    cellData: {
      firstName: 'Edna',
      lastName: 'Thomas',
      email: 'wunlilmu@nolejoge.cm',
    },
  },
  {
    rowId: '94',
    cellData: {
      firstName: 'Albert',
      lastName: 'Wheeler',
      email: 'kuputic@lomimto.gq',
    },
  },
  {
    rowId: '95',
    cellData: {
      firstName: 'Bernice',
      lastName: 'Harris',
      email: 'ge@lihes.eg',
    },
  },
  {
    rowId: '96',
    cellData: { firstName: 'Beulah', lastName: 'Griffin', email: 'zimu@en.fi' },
  },
  {
    rowId: '97',
    cellData: {
      firstName: 'Sue',
      lastName: 'Moore',
      email: 'lasdefur@muolakuz.tc',
    },
  },
];
