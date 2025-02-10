# CONTRIBUTING to McFly

Hi, and thanks for your interest to contribute to **McFly**! 🎉

This is the best place to start if you want to contribute to the project. You can do so by any of the following:
1. [Report issues or request features](#report-issues-or-request-features)
1. [Participate in discussions](#participate-in-discussions)
1. [Contribute code](#contribute-code)
1. [Get in touch](#get-in-touch)

## Report issues or request features

To open issues or feature requests, see our [issue tracker](https://todo.sr.ht/~ayoayco/mcfly). You can also send them via email to [`~ayoayco/mcfly@todo.sr.ht`](mailto:~ayoayco/mcfly@todo.sr.ht).

## Participate in discussions

To open new or participate on existing discussions, see our [mcfly-discussions](https://lists.sr.ht/~ayoayco/mcfly-discussions) mailing list.

## Contribute Code

We use `git` and `email` here -- it is actually fun!

To get started, setup [git send-email](https://git-send-email.io).

After setting up `git send-email` you can now follow the steps below to start hacking:

1️⃣ Clone the repository to your local machine, then go into the project directory:

```bash
$ git clone https://git.sr.ht/~ayoayco/mcfly
$ cd mcfly
```

2️⃣ Create a new branch for your changes:

```bash
git checkout -b my-branch
```

3️⃣ Make your changes, and then commit them with a descriptive message using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
git commit -m "feat(core): implement server-side rendering"
```

4️⃣ Use `git send-email` to send a patch:

```bash
git send-email --to="~ayoayco/mcfly-patches@lists.sr.ht" HEAD^
```

> The `HEAD^` bit is a reference to the latest commit, which will be added to your patch. This could be a range of commits as well if you have mutiple commits.

5️⃣ Wait for a response from us whether the patch needs rework... or a notification if it gets merged!

> As a summary, we use `git` and `email` to collaborate on McFly. You have to set up [git send-email](https://git-send-email.io) and send patches via email. :)


## Get in touch

If something needs clarification, or even if you just want to chat about the project, don't hesitate to reach out to me via email [`ayo@ayco.io`](mailto:ayo@ayco.io). Thanks! :)