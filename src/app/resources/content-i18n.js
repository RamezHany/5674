import { InlineCode } from "@/once-ui/components";

export const createI18nContent = (t) => {
    const person = {
        firstName: 'Ahmed',
        lastName:  'Zaghloul',
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role:      'Business Growth Strategist',
        avatar:    '/images/avatar.jpg',
        location:  'Africa/Cairo',
        languages: ['English']
    }

    const newsletter = {
        display: true,
        title: <>Subscribe to {person.lastName}'s Newsletter</>,
        description: <>If you don't want to miss out on my blog content, sign up to my newsletter. I occasionally write about business, technology, and share thoughts on the intersection between them.</>
    }
    
    const social = [
        {
            name: 'Facebook',
            icon: 'facebook-f',
            link: 'https://www.facebook.com/zaghloul.me/',
        },
        {
            name: 'LinkedIn',
            icon: 'linkedin',
            link: 'https://www.linkedin.com/in/zaghloul-me/',
        },
        {
            name: 'X',
            icon: 'x',
            link: 'https://x.com/ZaghloulMe/',
        },
        {
            name: 'Email',
            icon: 'envelope',
            link: 'mailto:ahmed@zaghloul.me',
        },
    ]

    const home = {
        label: t("home.label"),
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline")}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.label"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: true,
            subItems: true
        },
        avatar: {
            display: true
        },
        calendar: {
            display: true,
            link: 'https://cal.com'
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true,
            title: t("about.work.title"),
            experiences: [
                {
                    company: 'FLY',
                    timeframe: t("about.work.experiences.FLY.timeframe"),
                    role: t("about.work.experiences.FLY.role"),
                    achievements: t("about.work.experiences.FLY.achievements").split(";"),
                    images: [
                        {
                            src: '/images/projects/project-01/cover-01.jpg',
                            alt: 'Once UI Project',
                            width: 16,
                            height: 9
                        }
                    ]
                },
                {
                    company: 'Creativ3',
                    timeframe: t("about.work.experiences.Creativ3.timeframe"),
                    role: t("about.work.experiences.Creativ3.role"),
                    achievements: t("about.work.experiences.Creativ3.achievements").split(";"),
                    images: []
                }
            ]
        },
        studies: {
            display: true,
            title: t("about.studies.title"),
            institutions: [
                {
                    name: 'University of Jakarta',
                    description: <>{t("about.studies.institutions.University of Jakarta.description")}</>
                },
                {
                    name: 'Build the Future',
                    description: <>{t("about.studies.institutions.Build the Future.description")}</>
                }
            ]
        },
        technical: {
            display: true,
            title: t("about.technical.title"),
            skills: [
                {
                    title: 'Figma',
                    description: <>{t("about.technical.skills.Figma.description")}</>,
                    images: [
                        {
                            src: '/images/projects/project-01/cover-02.jpg',
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                        {
                            src: '/images/projects/project-01/cover-03.jpg',
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        }
                    ]
                },
                {
                    title: 'Next.js',
                    description: <>{t("about.technical.skills.Nextjs.description")}</>,
                    images: [
                        {
                            src: '/images/projects/project-01/cover-04.jpg',
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        }
                    ]
                }
            ]
        }
    }

    const blog = {
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
    }

    const gallery = {
        label: t("gallery.label"),
        title: t("gallery.title"),
        description: t("gallery.description", {name: person.name}),
        images: [
            {
                src: '/images/gallery/img-01.jpg',
                alt: t("gallery.images.img01.alt"),
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-02.jpg',
                alt: t("gallery.images.img02.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-03.jpg',
                alt: t("gallery.images.img03.alt"),
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-04.jpg',
                alt: t("gallery.images.img04.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-05.jpg',
                alt: t("gallery.images.img05.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-06.jpg',
                alt: t("gallery.images.img06.alt"),
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-07.jpg',
                alt: t("gallery.images.img07.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-08.jpg',
                alt: t("gallery.images.img08.alt"),
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-09.jpg',
                alt: t("gallery.images.img09.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-10.jpg',
                alt: t("gallery.images.img10.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-11.jpg',
                alt: t("gallery.images.img11.alt"),
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-12.jpg',
                alt: t("gallery.images.img12.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-13.jpg',
                alt: t("gallery.images.img13.alt"),
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-14.jpg',
                alt: t("gallery.images.img14.alt"),
                orientation: 'horizontal'
            }
        ]
    }

    const resources = {
        label: t("resources.label"),
        title: t("resources.title"),
        description: t("resources.description", {name: person.name}),
        items: [
            {
                id: '1',
                title: t("resources.items.designSystem.title"),
                description: t("resources.items.designSystem.description"),
                type: 'pdf',
                thumbnail: '/images/resources/design-system-checklist.jpg',
                url: '/resources/design-system-checklist.pdf'
            }
        ]
    }

    return {
        person,
        social,
        newsletter,
        home,
        about,
        blog,
        work,
        gallery,
        resources
    }
}