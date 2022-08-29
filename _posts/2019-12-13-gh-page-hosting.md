---
layout: post
title: "Newbie tips — 5 Advantage of Using GitHub Pages for Hosting"
date: 2019-12-13
description: "I am not a web developer, not yet. But you don’t have to be a web developer to set up a website with GitHub Pages."
image: /assets/images/brina-blum-Bb_X4JgSqIM-unsplash.jpg
author: Cheuk Ting Ho
tags:
  - GitHub
  - Web
---
I am not a web developer, not yet. But you don’t have to be a web developer to set up a website with GitHub Pages.

Recently I have an idea of putting all my work in one place, make it kind of like a portfolio. I brought a domain name — [cheuk.dev](https://cheuk.dev) (try to be cool) and went to the [IndieWebCamp](https://indieweb.org/IndieWebCamp) in Berlin where they are happy to help with web newbies to get started. They recommended many options, including Wordpress and Blogger, to get your website set up. But since I have experience maintain the website for [Python Sprint](https://python-sprints.github.io/), which uses [Jekyll](https://jekyllrb.com/) on [GitHub Pages](https://pages.github.com/), I feel more comfortable going down the GitHub route.

---------------

After playing for a few days, I found there are some nice features of GitHub Pages for newbies to set up their first website:

## 1. It’s FREE

It’s obvious that you don’t want to spend lots of money setting up your first website. It will be like a half hacking and half experimentation project so having a free hosting service is definitely encouraging for newbies to try out and get started. The only catch is you have to keep the repo and the code public.

## 2. Support Custom Domain

GitHub Pages comes with the default domain name like `https://<your_account_name>.github.io/`
![picture explaining GitHub pages - domain name](https://miro.medium.com/max/1514/0*VFTzosQZIxrF1wAC.png)
but you have brought a cool domain like I am. GitHub will let you use your own, just set up your custom domain following the [easy step by step guide](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site) and you are good to go. It may take a day or 2 for it to take effect though depending on your domain provider, after setup you can use your own domain like a pro.

## 3. Support for HTTPS

Since I got a cool .dev domain, I need to encrypt with https. My friend told me it is not easy for a newbie to get an open SSL certificate. GitHub has partnered with the certificate authority [Let’s Encrypt](https://letsencrypt.org/). After setting up your custom domain, select the Enforce HTTPS option.
![picture explaining GitHub pages - HTTPS](https://miro.medium.com/max/2908/0*Lz-SDhWlykqGN07L.png)

## 4. You don’t need Jeykll installed

Yes, even your website is set up with Jekyll you don’t need to have Jekyll installed locally. I have been maintaining [Python Sprint](https://python-sprints.github.io/) for almost a year without installing Jekyll on my computer.

> Jekyll is a parsing engine bundled as a ruby gem used to build static websites from dynamic components such as templates, partials, liquid code, markdown, etc. In simpler terms, it’s a simple, blog-aware, static website generator.

GitHub will build your website for you every time when you push to your repo named `<username>.github.io` if you have the files required by Jekyll (e.g. `_configure.yml` `_layouts/default.html` etc.) it will automatically build it for you.

## 5. Using git version control

If you are an experienced GitHub user and fairly comfortable using git like I am, you will appreciate being able to do version control on your website. You can always try something and commit it, if you want to roll back to the previous version, you can just do a reset. You can get all the benefits that git gives you while designing your website. So for newbies who are no so sure if something works and need to learn from trying, git will give you a safe playground for it and GitHub will happily store all versions of your sites for you.

----------------

So here you go, 5 advantage of using GitHub Pages for a starter website. If you are still not convinced to start your first website, I hope to see you at one of the [IndieWebCamps](https://indieweb.org/IndieWebCamp) and I am happy to help you out.
