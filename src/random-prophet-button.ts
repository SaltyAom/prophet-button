import { LitElement, html, css } from 'lit-element'
import {
    customElement,
    internalProperty,
    property
} from 'lit-element/lib/decorators'

const sounds = [
    'bàep née rîak wâa chon chìng dtee-chìng.mp3',
    'bàep née rîak wâa lia hĕe.mp3',
    'bpen à-rai gan.mp3',
    'chom-rom kon chôp mĕe.mp3',
    'dàp-bêrn hĕe.mp3',
    'doo dtàe mĕe.mp3',
    'doo gan mâng rĕu bplào.mp3',
    'doo tam-má-tam moh mâng dí doo bpràt-yaa kam kom wí-tĕe chee-wít bpà-ràt-yom kòm jai kòm gì-làyt dtan-hăa.mp3',
    'dòot kwăa dòot sáai.mp3',
    'dòot nom nòi.mp3',
    'dtaai láew pûak tân muay goo maa lá laa gòn doo mĕe bpai gòn pŏm jà doo muay.mp3',
    'dtà-gohn hăa săn-hăa dtàe mĕe.mp3',
    'dtà-gohn hăa săn-hăa.mp3',
    'goo mee sŏng-hĕe.mp3',
    'gôr bpen oh gàat an-dee têe pŏm jà ao bayn CLH hâa-săam maa tàai tam-má.mp3',
    'grà dâo-kon-née têe grà dâo-kon-née tee.mp3',
    'hĕe-hŏm hĕe-a-long  hĕe-a-long mâak loie nâa lia.mp3',
    'hĕn láew yang têe hĕn née keu pláat-dtìk têe kwăeng pâa.mp3',
    'hôie dtaai láew.mp3',
    'hóie kon têe năi pûak tân bpen kon jang-wàt à-rai gèrt wan năi gèrt bpee năi gèrt bpee jor rĕu bpee à-rai kráp pŏm mâi kâo jai.mp3',
    'hôie.mp3',
    'jà-rern nai tam.mp3',
    'jàt maa ao bàep-bêrm nâ keu leu nâ.mp3',
    'krai jà bpai lia hĕe măa lia hĕe kon lia hĕe mŏo hĕe kwaai goo mâi róo dtàe goo chôp lia hĕe kon.mp3',
    'măai kwaam wâa ngai nîa kon jang-wàt năi kon jang-wàt à-rai pûak tân nîa.mp3',
    'mâi kâo jai loie jing jing loie.mp3',
    'mâi kâo jai loie pûak tân bpen yang ngai.mp3',
    'mâi kâo jai.mp3',
    'man bpen yàang née dtông mee ù-bpà-gon.mp3',
    'man dee măi.mp3',
    'mee hĕe meen-má-née.mp3',
    'mĕe rá ngóp gan táng wan táng keun loie.mp3',
    'née bpen gaan sà-daeng hâi doo ná tân pôo jà-rern.mp3',
    'née bpen gaan sŏn tam-má ná pôo jà-rern.mp3',
    'pŏm mâi kâo jai jing loie.mp3',
    'pŏm mâi kâo jai loie jing jing.mp3',
    'prór hĕe man hŏm dee.mp3',
    'sà-wàt-dee kráp.mp3',
    'sòng bpai hâi láew gôr yang jà hâi doo èek.mp3',
    'tâa meung chôp lia hĕe măa meung gôr lia bpai bpai.mp3',
    'tâa taang yàang née rîak wâa grà dâo kôo.mp3',
    'tâa yàang née rîak wâa dòot nom.mp3',
    'tam-má grà-dtùk jì-dòk rá chaa jai.mp3',
    'tam ngaan mee dtàe mĕe plòh maa táng wan loie.mp3',
    'tam ngaan táng wan lá mĕe plòh táng wan loie.mp3',
    'táng dèk táng pôo yài.mp3',
    'táng wan loie wan nîa.mp3',
    'tân pôo jà-rern sêung mâak bpai dûay bpan-yaa.mp3',
    'tân sà-maa-chík.mp3',
    'trong née kor hĕe hĕe trong nun kor hĕe hĕe nee kor hĕe nun kor hĕe took took tée kor hĕe hĕe.mp3',
    'wan prá wan jâo mâi wáyn gan lóie.mp3',
    'wan-prá-yài ná.mp3',
    'yàak jà doo dtàe mĕe.mp3',
    'yìp òk maa yìp òk maa.mp3',
    'where are you.mp3'
]

@customElement('random-prophet-button')
export class RandomProphetButton extends LitElement {
    @internalProperty()
    src = sounds[Math.floor(Math.random() * sounds.length)]

    @property({ type: 'number' })
    time = 2

    @internalProperty()
    isPlaying = false

    play() {
        requestAnimationFrame(() => {
            this.isPlaying = true
        })

        if (this.isPlaying) this.isPlaying = false

        let sound = this.shadowRoot?.getElementById('sound') as HTMLAudioElement

        sound.pause()
        sound.currentTime = 0
        sound.play()

        sound.onplaying = () => {
            setTimeout(() => {
                this.isPlaying = false
            }, this.time * 1000 + 750)

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
                location.reload()
            }, this.time * 1000 + 1000)
        }
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                justify-content: center;
                margin: 20px 0;
            }

            #sound {
                display: none;
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
                <audio id="sound" preload="metadata">
                    <source src="/sound/${this.src}" type="audio/mpeg" />
                </audio>
            </button>
        `
    }
}
