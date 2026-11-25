# post-x-promote-make-your-own-bounty-01

[![bounty](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/AlfianBagas225/post-x-promote-make-your-own-bounty/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/AlfianBagas225/post-x-promote-make-your-own-bounty/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for make.fun's bounty "Promote make.fun's make-your-own-bounty post on
X". The post itself is the entry: one quote of
[make.fun's make-your-own-bounty post](https://x.com/makefunai/status/2124915864336236646)
from [@schizoql](https://x.com/schizoql), with a photo of its own attached and
the play code in its text. Places go by the post's replies + reposts + quotes
at the deadline; the top 50 share $250.

The post: https://x.com/schizoql/status/2125405081894060337

This repository hands in the post's address. `main.ts` (Node 22, standard
library only, no network, no clock) reads `POST.json`, checks that it names a
real X post address, and copies it unchanged to `/output/POST.json`.

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.
