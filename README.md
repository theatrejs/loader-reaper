[![Copyright](https://img.shields.io/badge/©-deformhead-white.svg)](https://github.com/deformhead) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theatrejs/loader-reaper/blob/master/LICENSE) [![Bundle Size (Gzipped)](https://img.shields.io/bundlejs/size/@theatrejs/loader-reaper@latest)](https://www.npmjs.com/package/@theatrejs/loader-reaper/v/latest) [![NPM Version](https://img.shields.io/npm/v/@theatrejs/loader-reaper/latest)](https://www.npmjs.com/package/@theatrejs/loader-reaper/v/latest)

# Reaper Webpack Loader

> *⚙️ A Webpack Loader for Reaper files.*

## Installation

> *⚠️ This loader needs you to have [**Reaper**](https://www.reaper.fm) installed and configured so that it renders to `*.wav` format (default Reaper configuration).*

```shell
npm install @theatrejs/loader-reaper --save-dev
```

## Webpack Configuration

```javascript
{
    'module': {
        'rules': [
            ...
            {
                'test': /\.rpp$/,
                'use': [
                    {
                        'loader': '@theatrejs/loader-reaper',
                        'options': {
                            'reaper': '<path-to-reaper>' // The path to the Reaper executable.
                        }
                    }
                ]
            }
            ...
        ]
    }
}
```

## Quick Start

> *⚠️ This example does not include the preloading of assets.*

```javascript
import {Actor, Sound} from '@theatrejs/theatrejs';

import soundBreathe from './breathe.rpp';

class Hero extends Actor {
    onCreate() {
        this.addSound(
            new Sound({
                $audio: soundBreathe
            })
        );
    }
}
```

## With Preloading

```javascript
import {FACTORIES, Sound} from '@theatrejs/theatrejs';

import soundBreathe from './breathe.rpp';

class Hero extends FACTORIES.ActorWithPreloadables([FACTORIES.PreloadableSound(soundBreathe)]) {
    onCreate() {
        this.addSound(
            new Sound({
                $audio: soundBreathe
            })
        );
    }
}
```
