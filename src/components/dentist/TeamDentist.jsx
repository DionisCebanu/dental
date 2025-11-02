import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '@/context/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AnimatedText from './AnimatedText';

const TeamDentist = () => {
  const { t, language } = useContext(LanguageContext); // ← use language (not locale)
  const [activeMember, setActiveMember] = useState(null);

  const teamMembers = [
    {
      nameKey: '',
      defaultName: 'Administrator',
      specialtyKey: 'teamAdminSpecialty',
      defaultSpecialty: 'Administrator',
      positionType: 'administrator',
      imageText: 'Administrator clinica stomatologica',
      imageSrc: '/images/team/administrator/administrator-image-1.JPG',
      about_ro:
        'Administrator al clinicii — responsabil pentru coordonarea activităților administrative și comunicarea cu pacienții.',
      about_ru:
        'Администратор клиники — отвечает за координацию административной деятельности и общение с пациентами.',
    },
    {
      nameKey: 'teamAsistentaName',
      defaultName: 'Trofaila Gabriela',
      specialtyKey: 'teamAsistentaSpecialty',
      defaultSpecialty: 'Asistentă medicală',
      positionType: 'asistenta-medicala',
      imageText: 'Asistentă medicală zâmbind',
      imageSrc: '/images/team/asistenta-medicala/asistenta-medicala-image-1.jpg',
      objectPosition: '20% 10%',
      about_ro:
        'Asistentă stomatologică și tehnician dentar — specialistă atentă și responsabilă, care stăpânește metode moderne de îngrijire a pacienților. Asigură precizie, calitate și confort în fiecare etapă a tratamentului.',
      about_ru:
        'Стоматологическая медсестра и зубной техник — внимательный и ответственный специалист, владеющий современными методами ухода за пациентами. Обеспечивает точность, качество и комфорт на каждом этапе лечения.',
    },
    {
      nameKey: 'teamInfirmieraName',
      defaultName: 'Infermiera',
      specialtyKey: 'teamInfirmieraSpecialty',
      defaultSpecialty: 'Infirmieră',
      positionType: 'infirmiera',
      imageText: 'Infirmieră zâmbind la clinică',
      imageSrc: '/images/team/infirmiera/infirmiera-image-1.JPG',
      objectPosition: '50% 30%',
      about_ro:
        'Infermiera - persoană responsabilă, care menține curățenia și sterilitatea în clinică, asigurând confortul și siguranța pacienților.',
      about_ru:
        'Младшая медсестра — отвечает за чистоту и стерильность в клинике, обеспечивая комфорт и безопасность пациентов.',
    },
    {
      nameKey: 'teamMediciGeneralistiName',
      defaultName: 'Zlenco Ion',
      specialtyKey: 'teamMediciGeneralistiSpecialty',
      defaultSpecialty: 'Medic stomatolog generalist',
      positionType: 'medici-generalisti',
      imageText: 'Medic generalist în cabinet',
      imageSrc: '/images/team/medici-generalisti/medic-generalist-image-1.JPG',
      objectPosition: '50% 35%',
      about_ro:
        'Medicul stomatolog generalist — specialist versatil, care efectuează tratamente terapeutice, protetice și chirurgicale. Deține cunoștințe vaste și experiență practică pentru a oferi soluții complete problemelor stomatologice de orice complexitate.',
      about_ru:
        'Стоматолог общего профиля — универсальный специалист, выполняющий терапевтические, ортопедические и хирургические процедуры. Обладает глубокими знаниями и практическим опытом для комплексного решения стоматологических проблем любой сложности.',
    },
    {
      nameKey: 'teamMediciGeneralistiName',
      defaultName: 'Niunin Alexandr',
      specialtyKey: 'teamMediciGeneralistiSpecialty',
      defaultSpecialty: 'Medic stomatolog generalist',
      positionType: 'medici-generalisti',
      imageText: 'Medic generalist în cabinet',
      imageSrc: '/images/team/medici-generalisti/medic-generalist-image-2.JPG',
      about_ro:
        'Medic stomatolog specializat in terapie și ortopedie cu peste 20 de ani de experiență. Efectuează tratamente și protezări dentare, combinând metodele clasice cu tehnologiile moderne pentru a obține rezultate estetice și funcționale de înaltă calitate.',
      about_ru:
        'Стоматолог, специализирующийся на терапии и ортопедии, с более чем 20-летним опытом. Проводит лечение и протезирование, сочетая классические методы с современными технологиями для достижения высококачественных эстетических и функциональных результатов.',
    },
    {
      nameKey: 'teamMediciOrtodontiName',
      defaultName: 'Trafaila Alina',
      specialtyKey: 'teamMediciOrtodontiSpecialty',
      defaultSpecialty: 'Medic specialist ortodonție',
      positionType: 'medici-ortodonti',
      imageText: 'Medic ortodont zâmbind',
      imageSrc: '/images/team/medici-ortodonti/medic-ortodont-image-1.jpg',
      objectPosition: '50% 15%',
      about_ro:
        'Medicul ortodont — specialistă cu peste 10 ani de experiență. A absolvit Universitatea de Medicină din Sankt Petersburg.Urmează constant cursuri de perfecționare internaționale, utilizează tehnologii moderne și oferă o abordare individuală pentru fiecare pacient.',
      about_ru:
        'Врач-ортодонт — специалист с более чем 10-летним опытом. Окончила Медицинский университет Санкт-Петербурга. Регулярно проходит международные курсы повышения квалификации, применяет современные технологии и индивидуальный подход к каждому пациенту.',
    },
    {
      nameKey: 'teamMediciOrtodontiName',
      defaultName: 'Baiceva Iana',
      specialtyKey: 'teamMediciOrtodontiSpecialty',
      defaultSpecialty: 'Medic specialist ortodonție',
      positionType: 'medici-ortodonti',
      imageText: 'Medic ortodont zâmbind',
      imageSrc: '/images/team/medici-ortodonti/medic-ortodont-image-2.jpg',
      objectPosition: '50% 20%',
      about_ro:
        'Medicul stomatolog ortodont — specialistă și asistentă universitară, cu experiență în aplicarea celor mai moderne metode de tratament ortodontic.',
      about_ru:
        'Стоматолог-ортодонт — специалист и преподаватель, имеющая опыт применения самых современных методов ортодонтического лечения.',
    },
    {
      nameKey: 'teamMedicSefName',
      defaultName: 'Boico Olga',
      specialtyKey: 'teamMedicSefSpecialty',
      defaultSpecialty: 'Medic șef al clinicii',
      positionType: 'medic-sef',
      imageText: 'Medic șef al echipei stomatologice',
      imageSrc: '/images/team/medic-sef/medic-sef-image-1.jpg',
      objectPosition: '30% 10%',
      about_ro:
        'Medicul principal al clinicii — specialistă cu înaltă calificare, având peste 20 de ani de experiență în domeniul medical. Deține cunoștințe profunde, aplică metode moderne de tratament și manifestă o atitudine atentă față de fiecare pacient. Sub conducerea ei, clinica oferă servicii medicale de înalt nivel și se bucură de încrederea pacienților.',
      about_ru:
        'Главный врач клиники — высококвалифицированный специалист с более чем 20-летним опытом работы. Обладает глубокими знаниями, применяет современные методы лечения и проявляет внимательное отношение к каждому пациенту. Под её руководством клиника предоставляет медицинские услуги высокого уровня и пользуется доверием пациентов.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' }
    })
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveMember(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openAbout = (member) => setActiveMember(member);
  const closeAbout = () => setActiveMember(null);

  // === getAboutText that reacts to language changes ===
  const getAboutText = (member) => {
    if (!member) return '';
    const lang = String(language || 'en').toLowerCase();

    // Primary key preferred by language
    const primaryByLang = {
      ru: 'about_ru',
      ro: 'about_ro',
      fr: 'about_ro', // no fr field, prefer RO
      en: 'about_ro', // no en field, prefer RO
    };
    const primary = primaryByLang[lang] || 'about_ro';

    const candidates = [
      member[primary],
      member.about_ro,
      member.about_ru,
      member.about, // in case a generic field appears in future
    ].filter(Boolean);

    const text = (candidates[0] || '').toString().trim();
    return text || t('dentist.aboutFallback', { defaultText: t('about', { defaultText: 'About' }) });
  };

  return (
    <section id="echipa" className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedText
            text={t('dentistTeamTitle', { defaultText: 'Echipa Noastră de Specialiști' })}
            el="h2"
            className="text-3xl sm:text-4xl text-foreground mb-4"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('dentistTeamSubtitle', {
              defaultText:
                'Medici stomatologi pasionați și experimentați, gata să vă ofere cele mai bune îngrijiri dentare.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.custom
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              elementType={Card}
              component={Card}
            >
              <Card className="w-full bg-card shadow-lg hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col text-center overflow-hidden">
                <div className="h-64 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectPosition: member.objectPosition || '50% 50%',
                      transform: `scale(${member.imageScale ?? 1})`,
                      transformOrigin: 'center center',
                    }}
                    alt={
                      `${t(member.nameKey, { defaultText: member.defaultName })} - ` +
                      t(member.specialtyKey, { defaultText: member.defaultSpecialty })
                    }
                    src={member.imageSrc}
                  />
                </div>

                <CardHeader className="pt-6">
                  <CardTitle className="text-xl font-bold text-foreground">
                    {t(member.nameKey, { defaultText: member.defaultName })}
                  </CardTitle>
                  <CardDescription className="text-primary font-medium text-sm">
                    {t(member.specialtyKey, { defaultText: member.defaultSpecialty })}
                  </CardDescription>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => openAbout(member)}
                      className="inline-block px-3 py-1.5 bg-primary text-white rounded-md text-sm hover:opacity-90 transition"
                    >
                      {t('about', { defaultText: 'About' })}
                    </button>
                  </div>
                </CardHeader>
              </Card>
            </motion.custom>
          ))}
        </div>
      </div>

      {/* About Modal */}
      {activeMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-title"
          onClick={closeAbout}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-10 max-w-2xl w-full mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 border-b dark:border-slate-700">
              <h3 id="about-title" className="text-lg font-semibold text-foreground">
                {t(activeMember.nameKey, { defaultText: activeMember.defaultName })} — {t(activeMember.specialtyKey, { defaultText: activeMember.defaultSpecialty })}
              </h3>
              <button
                aria-label={t('close', { defaultText: 'Close' })}
                onClick={closeAbout}
                className="ml-4 text-foreground/70 hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-6 text-left text-foreground leading-relaxed">
              <p>{getAboutText(activeMember)}</p>
            </div>
            <div className="p-4 border-t dark:border-slate-700 flex justify-end">
              <button
                type="button"
                onClick={closeAbout}
                className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-95 transition"
              >
                {t('close', { defaultText: 'Close' })}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamDentist;
