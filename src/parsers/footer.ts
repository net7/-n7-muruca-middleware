import Parser from "../interfaces/parser";

export class FooterParser implements Parser {
  parse(data: any, options?: { conf: { poweredby: boolean } }) {

    let footer;

    if (data.length == 2) {
      footer = {
         columns: [
           ...data,
           ...options?.conf.poweredby
             ? [
                 {
                   classes: 'n7-footer__muruca-promo',
                   text: "This project is powered by Muruca, a platform designed and developed by Net7, Pisa, Italy.<br><a href='https://www.muruca.org/' target='_blank'>www.muruca.org</a>, <a href='https://www.netseven.it' target='_blank'>www.netseven.it</a>",
                   images: [
                     {
                       url: '/assets/logo-muruca-footer.png',
                       alttext: 'Muruca digital library platform',
                       anchor: {
                         href: 'https://www.muruca.org',
                       },
                     },
                     {
                       url: '/assets/logo-net7.png',
                       alttext: 'Net7 Pisa',
                       anchor: {
                         href: 'https://www.netseven.it',
                       },
                     },
                   ],
                 },
               ]
             : [],
         ],
       };
     }
 
     if (data.length > 2) {
        const selects = data.pop();
       footer = {
         columns: [
           ...data,
           ...options?.conf.poweredby ? [
                 {
                   classes: 'n7-footer__muruca-promo',
                   text: "This project is powered by Muruca, a platform designed and developed by Net7, Pisa, Italy.<br><a href='https://www.muruca.org/' target='_blank'>www.muruca.org</a>, <a href='https://www.netseven.it' target='_blank'>www.netseven.it</a>",
                   images: [
                     {
                       url: '/assets/logo-muruca-footer.png',
                       alttext: 'Muruca digital library platform',
                       anchor: {
                         href: 'https://www.muruca.org',
                       },
                     },
                     {
                       url: '/assets/logo-net7.png',
                       alttext: 'Net7 Pisa',
                       anchor: {
                         href: 'https://www.netseven.it',
                       },
                     },
                   ],
                   selects: [
                     selects
                   ],
                 },
               ]
             : [],
         ],
       };
     }

    return footer;
  }
}
