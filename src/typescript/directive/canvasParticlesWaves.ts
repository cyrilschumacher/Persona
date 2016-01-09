/* The MIT License (MIT)
 *
 * Copyright (c) 2015 Cyril Schumacher.fr
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/// <amd-dependency path="canvasRenderer"/>
/// <amd-dependency path="projector"/>
/// <amd-dependency path="jquery"/>

import app = require("../app");

/**
 * @summary Directive for scroll to an element by its identifier.
 * @author  Cyril Schumacher
 * @class
 */
class CanvasParticlesWavesDirective implements ng.IDirective {
    /**
     * @summary Gets the screen height.
     * @private
     * @return {number} The screen height.
     */
    private get SCREEN_HEIGHT(): number {
        return window.innerHeight;
    }

    /**
     * @summary Gets the screen width.
     * @private
     * @return {number} The screen width.
     */
    private get SCREEN_WIDTH(): number {
        return window.innerWidth;
    }

    /**
     * @summary Gets the separation.
     * @private
     * @return {number} The separation.
     */
    private get SEPARATION(): number {
        return 100;
    }

    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = [];

    /**
     * @summary Restrict option.
     * @type {string}
     */
    public restrict: string = "A";

    /**
     * @summary X.
     * @private
     * @type {number}
     */
    private _amountX: number;

    /**
     * @summary Y.
     * @private
     * @type {number}
     */
    private _amountY: number;

    /**
     * @summary Camera.
     * @private
     * @type {THREE.PerspectiveCamera}
     */
    private _camera: THREE.PerspectiveCamera;

    /**
     * @summary Count position.
     * @private
     * @type {number}
     */
    private _count: number;

    /**
     * Renderer identifier.
     * @private
     * @type {number}
     */
    private _idRenderer: number;

    /**
     * @summary Horizontal position of the mouse.
     * @private
     * @type {number}
     */
    private _mouseX: number;

    /**
     * @summary Vertical position of the mouse.
     * @private
     * @type {number}
     */
    private _mouseY: number;

    /**
     * @summary Particles.
     * @private
     * @type {Array}
     */
    private _particles: Array<THREE.Sprite>;

    /**
     * @summary Render.
     * @private
     * @type {THREE.CanvasRenderer}
     */
    private _renderer: THREE.CanvasRenderer;

    /**
     * @summary Scene.
     * @private
     * @type {THREE.Scene}
     */
    private _scene: THREE.Scene;

    /**
     * @summary Horizontal size of the window.
     * @private
     * @type {number}
     */
    private _windowHalfX: number;

    /**
     * @summary Vertical size of the window.
     * @private
     * @type {number}
     */
    private _windowHalfY: number;

    /**
     * @summary Animates the animation.
     * @private
     */
    private _animate = (): void => {
        this._idRenderer = requestAnimationFrame(this._animate);
        this._render();
    };

    /**
     * @summary Destroys the directive.
     * @private
     */
    private _destroy = (): void => {
        cancelAnimationFrame(this._idRenderer);
        this._idRenderer = -1;
    };

    /**
     * @summary Initializes the animation.
     * @private
     */
    private _initialize = (container: HTMLDivElement): void => {
        this._idRenderer = -1;
        this._mouseX = 0;
        this._mouseY = 0;
        this._amountX = 50;
        this._amountY = 50;
        this._count = 0;
        this._windowHalfX = window.innerWidth / 2;
        this._windowHalfY = window.innerHeight / 2;

        this._camera = new THREE.PerspectiveCamera(100, (this.SCREEN_WIDTH / this.SCREEN_HEIGHT), 1, 10000);
        this._camera.position.z = 500;

        this._scene = new THREE.Scene();
        this._particles = new Array<THREE.Sprite>();

        let PI2 = Math.PI * 2;
        let material = new THREE.SpriteCanvasMaterial({
            color: 0xA6ABB2,
            program: (context) => {
                context.beginPath();
                context.arc(0, 0, 0.5, 0, PI2, true);
                context.fill();
            }
        });

        let i = 0;
        for (var ix = 0; ix < this._amountX; ix++) {
            for (var iy = 0; iy < this._amountY; iy++) {
                let particle = this._particles[i++] = new THREE.Sprite(material);
                particle.position.x = (ix * this.SEPARATION) - ((this._amountX * this.SEPARATION) / 2);
                particle.position.z = (iy * this.SEPARATION) - ((this._amountY * this.SEPARATION) / 2);

                this._scene.add(particle);
            }
        }

		const parameters: THREE.CanvasRendererParameters = { alpha: true };
        this._renderer = new THREE.CanvasRenderer(parameters);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this._renderer.domElement);
    };

    /**
     * @summary Determines if the WebGL is supported.
     * @private
     * @return {boolean} True if the WebGL is supported, otherwise, False.
     */
    private _isWebGLSupported = (): boolean => {
        return (() => {
            try {
                return !!window["WebGLRenderingContext"] && !!document.createElement("canvas").getContext("experimental-webgl");
            } catch (e) {
                return false;
            }
        })();
    };

    /**
     * @summary Raises when the window is resized.
     * @private
     */
    private _onWindowResize = (): void => {
        this._windowHalfX = window.innerWidth / 2;
        this._windowHalfY = window.innerHeight / 2;

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(window.innerWidth, window.innerHeight);
    };

    /**
     * @summary Raises when the mouse pointer is moved over the control.
     * @private
     */
    private _onDocumentMouseMove = (event: MouseEvent): void => {
        this._mouseX = event.clientX - this._windowHalfX;
        this._mouseY = event.clientY - this._windowHalfY;
    };

    /**
     * @summary Raises when the user makes contact with the touch surface and
     * creates a touch point inside the element the event is bound to.
     * @private
     */
    private _onDocumentTouchStart = (event: TouchEvent): void => {
        if (event.touches.length > 1) {
            event.preventDefault();

            this._mouseX = event.touches[0].pageX - this._windowHalfX;
            this._mouseY = event.touches[0].pageY - this._windowHalfY;
        }
    };

    /**
     * @summary Raises when the user moves the touch point across the touch surface.
     * @private
     */
    private _onDocumentTouchMove = (event: TouchEvent): void => {
        if (event.touches.length === 1) {
            event.preventDefault();

            this._mouseX = event.touches[0].pageX - this._windowHalfX;
            this._mouseY = event.touches[0].pageY - this._windowHalfY;
        }
    };

    /**
     * @summary Renders the animation.
     * @private
     */
    private _render = (): void => {
        this._camera.position.x += (this._mouseX - this._camera.position.x) * .05;
        this._camera.position.y += (- this._mouseY - this._camera.position.y) * .05;
        this._camera.lookAt(this._scene.position);

        let i = 0;
        for (var ix = 0; ix < this._amountX; ix++) {
            for (var iy = 0; iy < this._amountY; iy++) {
                let particle = this._particles[i++];
                particle.position.y = (Math.sin((ix + this._count) * 0.3) * 50) + (Math.sin((iy + this._count) * 0.5) * 50);
                particle.scale.x = (Math.sin((ix + this._count) * 0.3) + 1) * 4 + (Math.sin((iy + this._count) * 0.5) + 1) * 4;
                particle.scale.y = particle.scale.x;
            }
        }

        this._renderer.render(this._scene, this._camera);
        this._count += 0.1;
    };

    /**
     * @summary Manipulates the DOM of the current page.
     * @param {IScope}      scope   Angular scope object.
     * @param {JQuery}      element jqLite-wrapped element that this directive matches.
     * @param {IAttributes} attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
     */
    public link = (scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): void => {
        if (this._isWebGLSupported()) {
            this._initialize(<HTMLDivElement>element[0]);
            this._animate();

            // Document events.
            document.addEventListener("mousemove", this._onDocumentMouseMove, false);
            document.addEventListener("touchstart", this._onDocumentTouchStart, false);
            document.addEventListener("touchmove", this._onDocumentTouchMove, false);

            // Windows events.
            window.addEventListener("resize", this._onWindowResize, false);

            // Element events.
            element.on("$destroy", this._destroy);
        }
    };
}

export = CanvasParticlesWavesDirective;
app.module.directive("canvasParticlesWaves", () => new CanvasParticlesWavesDirective());
