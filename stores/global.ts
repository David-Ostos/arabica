import axios from "axios";
import type { MyAxiosRequestConfig } from "~/interfaces/axios";

export interface TopLevel {
  name: string;
  dial_code: string;
  code: string;
  emoji: string;
}


export const useGlobalStore = defineStore("global",() => {
  const route = useRoute()
  const heightNavProductor = ref();
  const heightNavLote = ref();
  const heightNavPerfil = ref();
  const heightNavComprador = ref();
  const isActiveSelectCodePhone = ref(false)

  const perfilComercial = ref()

  const codeCountry = [
    {
      code: "+93",
      bandera: "🇦🇫",
      name: "afghanistan",
    },
    {
      code: "+358",
      bandera: "🇫🇮",
      name: "finland",
    },
    {
      code: "+355",
      bandera: "🇦🇱",
      name: "albania",
    },
    {
      code: "+213",
      bandera: "🇩🇿",
      name: "algeria",
    },
    {
      code: "+1684",
      bandera: "🇦🇸",
      name: "american samoa",
    },
    {
      code: "+244",
      bandera: "🇦🇴",
      name: "angola",
    },
    {
      code: "+376",
      bandera: "🇦🇩",
      name: "andorra",
    },
    {
      code: "+1264",
      bandera: "🇦🇮",
      name: "anguilla",
    },
    {
      code: "+672",
      bandera: "🇳🇫",
      name: "norfolk island",
    },
    {
      code: "+54",
      bandera: "🇦🇷",
      name: "argentina",
    },
    {
      code: "+1268",
      bandera: "🇦🇬",
      name: "antigua and barbuda",
    },
    {
      code: "+374",
      bandera: "🇦🇲",
      name: "armenia",
    },
    {
      code: "+297",
      bandera: "🇦🇼",
      name: "aruba",
    },
    {
      code: "+61",
      bandera: "🇨🇨",
      name: "cocos (keeling) islands",
    },
    {
      code: "+43",
      bandera: "🇦🇹",
      name: "austria",
    },
    {
      code: "+994",
      bandera: "🇦🇿",
      name: "azerbaijan",
    },
    {
      code: "+1242",
      bandera: "🇧🇸",
      name: "bahamas",
    },
    {
      code: "+973",
      bandera: "🇧🇭",
      name: "bahrain",
    },
    {
      code: "+880",
      bandera: "🇧🇩",
      name: "bangladesh",
    },
    {
      code: "+1246",
      bandera: "🇧🇧",
      name: "barbados",
    },
    {
      code: "+375",
      bandera: "🇧🇾",
      name: "belarus",
    },
    {
      code: "+32",
      bandera: "🇧🇪",
      name: "belgium",
    },
    {
      code: "+501",
      bandera: "🇧🇿",
      name: "belize",
    },
    {
      code: "+229",
      bandera: "🇧🇯",
      name: "benin",
    },
    {
      code: "+1441",
      bandera: "🇧🇲",
      name: "bermuda",
    },
    {
      code: "+975",
      bandera: "🇧🇹",
      name: "bhutan",
    },
    {
      code: "+591",
      bandera: "🇧🇴",
      name: "bolivia, plurinational state of",
    },
    {
      code: "+387",
      bandera: "🇧🇦",
      name: "bosnia and herzegovina",
    },
    {
      code: "+267",
      bandera: "🇧🇼",
      name: "botswana",
    },
    {
      code: "+55",
      bandera: "🇧🇷",
      name: "brazil",
    },
    {
      code: "+246",
      bandera: "🇮🇴",
      name: "british indian ocean territory",
    },
    {
      code: "+673",
      bandera: "🇧🇳",
      name: "brunei darussalam",
    },
    {
      code: "+359",
      bandera: "🇧🇬",
      name: "bulgaria",
    },
    {
      code: "+226",
      bandera: "🇧🇫",
      name: "burkina faso",
    },
    {
      code: "+257",
      bandera: "🇧🇮",
      name: "burundi",
    },
    {
      code: "+855",
      bandera: "🇰🇭",
      name: "cambodia",
    },
    {
      code: "+237",
      bandera: "🇨🇲",
      name: "cameroon",
    },
    {
      code: "+1",
      bandera: "🇺🇸",
      name: "united states",
    },
    {
      code: "+238",
      bandera: "🇨🇻",
      name: "cape verde",
    },
    {
      code: "+ 345",
      bandera: "🇰🇾",
      name: "cayman islands",
    },
    {
      code: "+236",
      bandera: "🇨🇫",
      name: "central african republic",
    },
    {
      code: "+235",
      bandera: "🇹🇩",
      name: "chad",
    },
    {
      code: "+56",
      bandera: "🇨🇱",
      name: "chile",
    },
    {
      code: "+86",
      bandera: "🇨🇳",
      name: "china",
    },
    {
      code: "+57",
      bandera: "🇨🇴",
      name: "colombia",
    },
    {
      code: "+269",
      bandera: "🇰🇲",
      name: "comoros",
    },
    {
      code: "+242",
      bandera: "🇨🇬",
      name: "congo",
    },
    {
      code: "+243",
      bandera: "🇨🇩",
      name: "congo, the democratic republic of the congo",
    },
    {
      code: "+682",
      bandera: "🇨🇰",
      name: "cook islands",
    },
    {
      code: "+506",
      bandera: "🇨🇷",
      name: "costa rica",
    },
    {
      code: "+225",
      bandera: "🇨🇮",
      name: "cote d'ivoire",
    },
    {
      code: "+385",
      bandera: "🇭🇷",
      name: "croatia",
    },
    {
      code: "+53",
      bandera: "🇨🇺",
      name: "cuba",
    },
    {
      code: "+357",
      bandera: "🇨🇾",
      name: "cyprus",
    },
    {
      code: "+420",
      bandera: "🇨🇿",
      name: "czech republic",
    },
    {
      code: "+45",
      bandera: "🇩🇰",
      name: "denmark",
    },
    {
      code: "+253",
      bandera: "🇩🇯",
      name: "djibouti",
    },
    {
      code: "+1767",
      bandera: "🇩🇲",
      name: "dominica",
    },
    {
      code: "+1849",
      bandera: "🇩🇴",
      name: "dominican republic",
    },
    {
      code: "+593",
      bandera: "🇪🇨",
      name: "ecuador",
    },
    {
      code: "+20",
      bandera: "🇪🇬",
      name: "egypt",
    },
    {
      code: "+503",
      bandera: "🇸🇻",
      name: "el salvador",
    },
    {
      code: "+240",
      bandera: "🇬🇶",
      name: "equatorial guinea",
    },
    {
      code: "+291",
      bandera: "🇪🇷",
      name: "eritrea",
    },
    {
      code: "+372",
      bandera: "🇪🇪",
      name: "estonia",
    },
    {
      code: "+251",
      bandera: "🇪🇹",
      name: "ethiopia",
    },
    {
      code: "+500",
      bandera: "🇬🇸",
      name: "south georgia and the south sandwich islands",
    },
    {
      code: "+298",
      bandera: "🇫🇴",
      name: "faroe islands",
    },
    {
      code: "+679",
      bandera: "🇫🇯",
      name: "fiji",
    },
    {
      code: "+33",
      bandera: "🇫🇷",
      name: "france",
    },
    {
      code: "+594",
      bandera: "🇬🇫",
      name: "french guiana",
    },
    {
      code: "+689",
      bandera: "🇵🇫",
      name: "french polynesia",
    },
    {
      code: "+241",
      bandera: "🇬🇦",
      name: "gabon",
    },
    {
      code: "+220",
      bandera: "🇬🇲",
      name: "gambia",
    },
    {
      code: "+995",
      bandera: "🇬🇪",
      name: "georgia",
    },
    {
      code: "+49",
      bandera: "🇩🇪",
      name: "germany",
    },
    {
      code: "+233",
      bandera: "🇬🇭",
      name: "ghana",
    },
    {
      code: "+350",
      bandera: "🇬🇮",
      name: "gibraltar",
    },
    {
      code: "+30",
      bandera: "🇬🇷",
      name: "greece",
    },
    {
      code: "+299",
      bandera: "🇬🇱",
      name: "greenland",
    },
    {
      code: "+1473",
      bandera: "🇬🇩",
      name: "grenada",
    },
    {
      code: "+590",
      bandera: "🇫🇷",
      name: "saint martin",
    },
    {
      code: "+1671",
      bandera: "🇬🇺",
      name: "guam",
    },
    {
      code: "+502",
      bandera: "🇬🇹",
      name: "guatemala",
    },
    {
      code: "+44",
      bandera: "🇬🇧",
      name: "united kingdom",
    },
    {
      code: "+224",
      bandera: "🇬🇳",
      name: "guinea",
    },
    {
      code: "+245",
      bandera: "🇬🇼",
      name: "guinea-bissau",
    },
    {
      code: "+595",
      bandera: "🇵🇾",
      name: "paraguay",
    },
    {
      code: "+509",
      bandera: "🇭🇹",
      name: "haiti",
    },
    {
      code: "+379",
      bandera: "🇻🇦",
      name: "holy see (vatican city state)",
    },
    {
      code: "+504",
      bandera: "🇭🇳",
      name: "honduras",
    },
    {
      code: "+852",
      bandera: "🇭🇰",
      name: "hong kong",
    },
    {
      code: "+36",
      bandera: "🇭🇺",
      name: "hungary",
    },
    {
      code: "+354",
      bandera: "🇮🇸",
      name: "iceland",
    },
    {
      code: "+91",
      bandera: "🇮🇳",
      name: "india",
    },
    {
      code: "+62",
      bandera: "🇮🇩",
      name: "indonesia",
    },
    {
      code: "+98",
      bandera: "🇮🇷",
      name: "iran, islamic republic of persian gulf",
    },
    {
      code: "+964",
      bandera: "🇮🇶",
      name: "iraq",
    },
    {
      code: "+353",
      bandera: "🇮🇪",
      name: "ireland",
    },
    {
      code: "+972",
      bandera: "🇮🇱",
      name: "israel",
    },
    {
      code: "+39",
      bandera: "🇮🇹",
      name: "italy",
    },
    {
      code: "+1876",
      bandera: "🇯🇲",
      name: "jamaica",
    },
    {
      code: "+81",
      bandera: "🗾",
      name: "japan",
    },
    {
      code: "+962",
      bandera: "🇯🇴",
      name: "jordan",
    },
    {
      code: "+77",
      bandera: "🇰🇿",
      name: "kazakhstan",
    },
    {
      code: "+254",
      bandera: "🇰🇪",
      name: "kenya",
    },
    {
      code: "+686",
      bandera: "🇰🇮",
      name: "kiribati",
    },
    {
      code: "+850",
      bandera: "🇰🇵",
      name: "korea, democratic people's republic of korea",
    },
    {
      code: "+82",
      bandera: "🇰🇷",
      name: "korea, republic of south korea",
    },
    {
      code: "+965",
      bandera: "🇰🇼",
      name: "kuwait",
    },
    {
      code: "+996",
      bandera: "🇰🇬",
      name: "kyrgyzstan",
    },
    {
      code: "+856",
      bandera: "🇱🇦",
      name: "laos",
    },
    {
      code: "+371",
      bandera: "🇱🇻",
      name: "latvia",
    },
    {
      code: "+961",
      bandera: "🇱🇧",
      name: "lebanon",
    },
    {
      code: "+266",
      bandera: "🇱🇸",
      name: "lesotho",
    },
    {
      code: "+231",
      bandera: "🇱🇷",
      name: "liberia",
    },
    {
      code: "+218",
      bandera: "🇱🇾",
      name: "libyan arab jamahiriya",
    },
    {
      code: "+423",
      bandera: "🇱🇮",
      name: "liechtenstein",
    },
    {
      code: "+370",
      bandera: "🇱🇹",
      name: "lithuania",
    },
    {
      code: "+352",
      bandera: "🇱🇺",
      name: "luxembourg",
    },
    {
      code: "+853",
      bandera: "🇲🇴",
      name: "macao",
    },
    {
      code: "+599",
      bandera: "🇳🇱",
      name: "netherlands antilles",
    },
    {
      code: "+63",
      bandera: "🇵🇭",
      name: "philippines",
    },
    {
      code: "+1758",
      bandera: "🇱🇨",
      name: "saint lucia",
    },
    {
      code: "+221",
      bandera: "🇸🇳",
      name: "senegal",
    },
    {
      code: "+94",
      bandera: "🇱🇰",
      name: "sri lanka",
    },
    {
      code: "+228",
      bandera: "🇹🇬",
      name: "togo",
    },
    {
      code: "+683",
      bandera: "🇳🇺",
      name: "niue",
    },
    {
      code: "+48",
      bandera: "🇵🇱",
      name: "poland",
    },
    {
      code: "+508",
      bandera: "🇵🇲",
      name: "saint pierre and miquelon",
    },
    {
      code: "+421",
      bandera: "🇸🇰",
      name: "slovakia",
    },
    {
      code: "+261",
      bandera: "🇲🇬",
      name: "madagascar",
    },
    {
      code: "+212",
      bandera: "🇲🇦",
      name: "morocco",
    },
    {
      code: "+998",
      bandera: "🇺🇿",
      name: "uzbekistan",
    },
    {
      code: "+250",
      bandera: "🇷🇼",
      name: "rwanda",
    },
    {
      code: "+239",
      bandera: "🇸🇹",
      name: "sao tome and principe",
    },
    {
      code: "+386",
      bandera: "🇸🇮",
      name: "slovenia",
    },
    {
      code: "+596",
      bandera: "🇲🇶",
      name: "martinique",
    },
    {
      code: "+258",
      bandera: "🇲🇿",
      name: "mozambique",
    },
    {
      code: "+51",
      bandera: "🇵🇪",
      name: "peru",
    },
    {
      code: "+1869",
      bandera: "🇰🇳",
      name: "saint kitts and nevis",
    },
    {
      code: "+381",
      bandera: "🇷🇸",
      name: "serbia",
    },
    {
      code: "+249",
      bandera: "🇸🇩",
      name: "sudan",
    },
    {
      code: "+690",
      bandera: "🇹🇰",
      name: "tokelau",
    },
    {
      code: "+970",
      bandera: "🇵🇸",
      name: "palestinian territory, occupied",
    },
    {
      code: "+7",
      bandera: "🇷🇺",
      name: "russia",
    },
    {
      code: "+966",
      bandera: "🇸🇦",
      name: "saudi arabia",
    },
    {
      code: "+677",
      bandera: "🇸🇧",
      name: "solomon islands",
    },
    {
      code: "+222",
      bandera: "🇲🇷",
      name: "mauritania",
    },
    {
      code: "+95",
      bandera: "🇲🇲",
      name: "myanmar",
    },
    {
      code: "+507",
      bandera: "🇵🇦",
      name: "panama",
    },
    {
      code: "+1784",
      bandera: "🇻🇨",
      name: "saint vincent and the grenadines",
    },
    {
      code: "+65",
      bandera: "🇸🇬",
      name: "singapore",
    },
    {
      code: "+597",
      bandera: "🇸🇷",
      name: "suriname",
    },
    {
      code: "+676",
      bandera: "🇹🇴",
      name: "tonga",
    },
    {
      code: "+971",
      bandera: "🇦🇪",
      name: "united arab emirates",
    },
    {
      code: "+685",
      bandera: "🇼🇸",
      name: "samoa",
    },
    {
      code: "+232",
      bandera: "🇸🇱",
      name: "sierra leone",
    },
    {
      code: "+389",
      bandera: "🇲🇰",
      name: "macedonia",
    },
    {
      code: "+264",
      bandera: "🇳🇦",
      name: "namibia",
    },
    {
      code: "+675",
      bandera: "🇵🇬",
      name: "papua new guinea",
    },
    {
      code: "+378",
      bandera: "🇸🇲",
      name: "san marino",
    },
    {
      code: "+252",
      bandera: "🇸🇴",
      name: "somalia",
    },
    {
      code: "+41",
      bandera: "🇨🇭",
      name: "switzerland",
    },
    {
      code: "+598",
      bandera: "🇺🇾",
      name: "uruguay",
    },
    {
      code: "+967",
      bandera: "🇾🇪",
      name: "yemen",
    },
    {
      code: "+248",
      bandera: "🇸🇨",
      name: "seychelles",
    },
    {
      code: "+268",
      bandera: "🇸🇿",
      name: "swaziland",
    },
    {
      code: "+674",
      bandera: "🇳🇷",
      name: "nauru",
    },
    {
      code: "+678",
      bandera: "🇻🇺",
      name: "vanuatu",
    },
    {
      code: "+356",
      bandera: "🇲🇹",
      name: "malta",
    },
    {
      code: "+27",
      bandera: "🇿🇦",
      name: "south africa",
    },
    {
      code: "+52",
      bandera: "🇲🇽",
      name: "mexico",
    },
    {
      code: "+1664",
      bandera: "🇲🇸",
      name: "montserrat",
    },
    {
      code: "+976",
      bandera: "🇲🇳",
      name: "mongolia",
    },
    {
      code: "+382",
      bandera: "🇲🇪",
      name: "montenegro",
    },
    {
      code: "+60",
      bandera: "🇲🇾",
      name: "malaysia",
    },
    {
      code: "+265",
      bandera: "🇲🇼",
      name: "malawi",
    },
    {
      code: "+223",
      bandera: "🇲🇱",
      name: "mali",
    },
    {
      code: "+230",
      bandera: "🇲🇺",
      name: "mauritius",
    },
    {
      code: "+960",
      bandera: "🇲🇻",
      name: "maldives",
    },
    {
      code: "+31",
      bandera: "🇳🇱",
      name: "netherlands",
    },
    {
      code: "+377",
      bandera: "🇲🇨",
      name: "monaco",
    },
    {
      code: "+373",
      bandera: "🇲🇩",
      name: "moldova",
    },
    {
      code: "+977",
      bandera: "🇳🇵",
      name: "nepal",
    },
    {
      code: "+692",
      bandera: "🇲🇭",
      name: "marshall islands",
    },
    {
      code: "+262",
      bandera: "🇷🇪",
      name: "reunion",
    },
    {
      code: "+691",
      bandera: "🇫🇲",
      name: "micronesia, federated states of micronesia",
    },
    {
      code: "+687",
      bandera: "🇳🇨",
      name: "new caledonia",
    },
    {
      code: "+505",
      bandera: "🇳🇮",
      name: "nicaragua",
    },
    {
      code: "+64",
      bandera: "🇳🇿",
      name: "new zealand",
    },
    {
      code: "+1670",
      bandera: "🇲🇵",
      name: "northern mariana islands",
    },
    {
      code: "+234",
      bandera: "🇳🇬",
      name: "nigeria",
    },
    {
      code: "+227",
      bandera: "🇳🇪",
      name: "niger",
    },
    {
      code: "+90",
      bandera: "🇹🇷",
      name: "turkey",
    },
    {
      code: "+680",
      bandera: "🇵🇼",
      name: "palau",
    },
    {
      code: "+92",
      bandera: "🇵🇰",
      name: "pakistan",
    },
    {
      code: "+47",
      bandera: "🇳🇴",
      name: "svalbard and jan mayen",
    },
    {
      code: "+968",
      bandera: "🇴🇲",
      name: "oman",
    },
    {
      code: "+872",
      bandera: "🇵🇳",
      name: "pitcairn",
    },
    {
      code: "+1939",
      bandera: "🇵🇷",
      name: "puerto rico",
    },
    {
      code: "+351",
      bandera: "🇵🇹",
      name: "portugal",
    },
    {
      code: "+974",
      bandera: "🇶🇦",
      name: "qatar",
    },
    {
      code: "+40",
      bandera: "🇷🇴",
      name: "romania",
    },
    {
      code: "+290",
      bandera: "🇸🇭",
      name: "saint helena, ascension and tristan da cunha",
    },
    {
      code: "+34",
      bandera: "🇪🇸",
      name: "spain",
    },
    {
      code: "+211",
      bandera: "🇸🇸",
      name: "south sudan",
    },
    {
      code: "+46",
      bandera: "🇸🇪",
      name: "sweden",
    },
    {
      code: "+963",
      bandera: "🇸🇾",
      name: "syrian arab republic",
    },
    {
      code: "+886",
      bandera: "🇹🇼",
      name: "taiwan",
    },
    {
      code: "+670",
      bandera: "🇹🇱",
      name: "timor-leste",
    },
    {
      code: "+1649",
      bandera: "🇹🇨",
      name: "turks and caicos islands",
    },
    {
      code: "+66",
      bandera: "🇹🇭",
      name: "thailand",
    },
    {
      code: "+688",
      bandera: "🇹🇻",
      name: "tuvalu",
    },
    {
      code: "+1868",
      bandera: "🇹🇹",
      name: "trinidad and tobago",
    },
    {
      code: "+216",
      bandera: "🇹🇳",
      name: "tunisia",
    },
    {
      code: "+256",
      bandera: "🇺🇬",
      name: "uganda",
    },
    {
      code: "+255",
      bandera: "🇹🇿",
      name: "tanzania, united republic of tanzania",
    },
    {
      code: "+58",
      bandera: "🇻🇪",
      name: "venezuela, bolivarian republic of venezuela",
    },
    {
      code: "+993",
      bandera: "🇹🇲",
      name: "turkmenistan",
    },
    {
      code: "+1284",
      bandera: "🇻🇬",
      name: "virgin islands, british",
    },
    {
      code: "+84",
      bandera: "🇻🇳",
      name: "vietnam",
    },
    {
      code: "+380",
      bandera: "🇺🇦",
      name: "ukraine",
    },
    {
      code: "+992",
      bandera: "🇹🇯",
      name: "tajikistan",
    },
    {
      code: "+1340",
      bandera: "🇻🇮",
      name: "virgin islands, u.s.",
    },
    {
      code: "+263",
      bandera: "🇿🇼",
      name: "zimbabwe",
    },
    {
      code: "+260",
      bandera: "🇿🇲",
      name: "zambia",
    },
    {
      code: "+681",
      bandera: "🇼🇫",
      name: "wallis and futuna",
    },
  ];
  const years = computed(() => {
    const year = [];
    for (let año = 2024; año >= 1800; año--) {
      year.push(año.toString());
    }
    return year;
  }); 



  const getPerfil =  async (id: string)=>{try {
    console.log(id);
    await axios.get(`${import.meta.env.VITE_URL_API}/api/content/item/productores/${id}?fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}&populate=1`,{
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
      },

    })
    .then( async (res) =>{
      perfilComercial.value = res.data
      console.log(perfilComercial.value);
    })

  } catch (error) {
    console.log(error);
  }
}
  
/*  const codeCountry1 = Object.entries(codeCountry1).map(([code, { name, dial_code, emoji }]) => ({
    code: dial_code,
    bandera: emoji,
    name: name.toLowerCase()
})); */



/* console.log(codeCountry);

  codeCountry.forEach(codigo => {
    console.log({codigo});
    addNewFieldDB("codigoPais", "codigo", {codigo} )
  }) */

  // este codigo esta para modificar los datos de los lotes por si se agrego un nuevo campo a la base de datos
  // addNewFieldDB("codigoPais", "codigo", ); // aqui agregas los valores del modelo, el campo que deseas agregar y el valor
  // async function addNewFieldDB(model: any, dato: string, valor: any) {
  //   try {
  //     await axios
  //       .get(`${import.meta.env.VITE_URL_API}/api/content/items/${model}`, {
  //         headers: {
  //           "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
  //         },
  //         cache: "no-cache",
  //       } as MyAxiosRequestConfig)
  //       .then( async(res) => {
  //       //   console.log(res.data);

  //       //   res.data.forEach(async (model: any) => {
  //       //     const data = { _id: model._id, [dato]: valor };
  //       //     if (model[dato]) {
  //       //       try {
  //       //         await axios({
  //       //           url: `${import.meta.env.VITE_URL_API}/api/content/item/${model}`,
  //       //           method: "POST",
  //       //           mode: "cors",
  //       //           headers: {
  //       //             "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
  //       //           },
  //       //           data: { data }
  //       //         } as MyAxiosRequestConfig)
  //       //           .then((res) => console.log(res))
  //       //           .catch((err) => console.log(err));
  //       //       } catch (error) {
  //       //         console.log(error);
  //       //       }
  //       //     }
  //       //   });
  //       // }else{

  //       // si se esta agregando campos nuevos
  //         /* await axios({
  //           url: `${import.meta.env.VITE_URL_API}/api/content/item/${model}`,
  //           method: "POST",
  //           mode: "cors",
  //           headers: {
  //             "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
  //           },
  //           data: { data: valor }
  //         } as MyAxiosRequestConfig)
  //           .then((res) => console.log(res))
  //           .catch((err) => console.log(err)); */
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return {
    heightNavProductor ,
    heightNavLote ,
    heightNavPerfil ,
    heightNavComprador ,
    isActiveSelectCodePhone,
    codeCountry,
    perfilComercial,
    years,

    getPerfil
  };
});
