import { LitElement, html, css } from 'lit-element'
import {
    customElement,
    internalProperty,
    property
} from 'lit-element/lib/decorators'

@customElement('prophet-button')
export class ProphetButton extends LitElement {
    @property({ type: 'string' })
    src = ''

    @property({ type: 'number' })
    time = 2

    @internalProperty()
    isPlaying = false

    play() {
        if (this.isPlaying) this.isPlaying = false

        requestAnimationFrame(() => {
            this.isPlaying = true

            let sound = new Audio(`/sound/${this.src}`)

            sound.play()

            if ('mediaSession' in navigator) {
                // @ts-ignore
                navigator.mediaSession.setActionHandler('play', () =>
                    sound.play()
                )

                // @ts-ignore
                navigator.mediaSession.setActionHandler('pause', () =>
                    sound.pause()
                )

                // @ts-ignore
                navigator.mediaSession.setActionHandler(
                    'seekbackward',
                    () => null
                )

                // @ts-ignore
                navigator.mediaSession.setActionHandler(
                    'seekforward',
                    () => null
                )

                // @ts-ignore
                navigator.mediaSession.setActionHandler(
                    'previoustrack',
                    () => null
                )

                // @ts-ignore
                navigator.mediaSession.setActionHandler('nexttrack', () => null)
            }

            setTimeout(() => {
                this.isPlaying = false
            }, this.time * 1000 + 750)
        })
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                justify-content: center;
                margin: 20px 0;
            }

            #button {
                position: relative;
                display: flex;
                flex-direction: row;
                appearance: none;
                -webkit-appearance: none;
                padding: 12px 32px;
                border-radius: 4px;
                background-color: #007aff;
                box-shadow: 0 2px 4px #007aff70, 0 4px 16px #007aff50,
                    0 16px 40px #007aff50;
                border: 0;
                outline: none;
                cursor: pointer;
                transition: box-shadow 0.2s ease-out;
            }

            #button:hover,
            #button:focus {
                box-shadow: 0 2px 4px #007aff80, 0 20px 48px #007aff60,
                    0 16px 40px #007aff60;
            }

            #title {
                font-family: 'Kanit', sans-serif;
                color: #fff;
                margin: 0;
                font-size: 21px;
            }

            #overlay {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 0;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.2);
            }

            @keyframes play {
                from {
                    width: 0;
                }

                to {
                    width: 100%;
                }
            }

            @keyframes fade-out {
                from {
                    width: 100%;
                    opacity: 1;
                }

                to {
                    width: 100%;
                    opacity: 0;
                }
            }
        `
    }

    render() {
        return html`
            <link rel="preload" href="/sound/${this.src}" as="audio" />
            <button id="button" @click="${this.play}">
                <p id="title">
                    <slot></slot>
                </p>
                <div
                    id="overlay"
                    style=${this.isPlaying
                        ? `animation: play ${this.time}s 0s 1 ease-out, fade-out .75s ${this.time}s 1 ease-out;`
                        : ''}
                />
            </button>
        `
    }
}
