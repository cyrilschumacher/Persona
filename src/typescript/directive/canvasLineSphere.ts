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

/// <reference path="../typing/angularjs/angular.d.ts" />
/// <reference path="../typing/threejs/detector.d.ts"/>
/// <reference path="../typing/threejs/three.d.ts" />

import app = require("../app");

/**
 * @summary Directive for scroll to an element by its identifier.
 * @author  Cyril Schumacher
 * @class
 */
class CanvasLineSphereDirective implements ng.IDirective {
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

    private _windowHalfX: number;
    private _windowHalfY: number;

    /**
     * Camera.
     * @private
     * @type {THREE.PerspectiveCamera}
     */
    private _camera: THREE.PerspectiveCamera;

    /**
     * Horizontal position of the mouse.
     * @private
     * @type {number}
     */
    private _mouseX: number;

    /**
     * Vertical position of the mouse.
     * @private
     * @type {number}
     */
    private _mouseY: number;

    /**
     * Render.
     * @private
     * @type {THREE.CanvasRenderer}
     */
    private _renderer: THREE.CanvasRenderer;

    /**
     * Scene.
     * @private
     * @type {THREE.Scene}
     */
    private _scene: THREE.Scene;

    /**
     * Raises when the window is resized.
     * @private
     */
    private _onWindowResize = (): void => {
        this._windowHalfX = window.innerWidth / 2;
        this._windowHalfY = window.innerHeight / 2;

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }

    /**
     * Raises when the window is resized.
     * @private
     */
    private _onDocumentMouseMove = (event: MouseEvent): void => {
        this._mouseX = event.clientX - this._windowHalfX;
        this._mouseY = event.clientY - this._windowHalfY;
    }

    /**
     * Raises when the window is resized.
     * @private
     */
    private _onDocumentTouchStart = (event: TouchEvent): void => {
        if (event.touches.length > 1) {
            event.preventDefault();

            this._mouseX = event.touches[0].pageX - this._windowHalfX;
            this._mouseY = event.touches[0].pageY - this._windowHalfY;
        }
    }

    /**
     * Raises when the window is resized.
     * @private
     */
    private _animate = (): void => {
        requestAnimationFrame(this._animate);
        this._render();
    }

    /**
     * Raises when the window is resized.
     * @private
     */
    private _render = (): void => {
        this._camera.position.x += (this._mouseX - this._camera.position.x) * .05;
        this._camera.position.y += (- this._mouseY + 200 - this._camera.position.y) * .05;
        this._camera.lookAt(this._scene.position);

        this._renderer.render(this._scene, this._camera);
    }

    /**
     * Raises when the window is resized.
     * @private
     */
    private _onDocumentTouchMove = (event: TouchEvent): void => {
        if (event.touches.length == 1) {
            event.preventDefault();

            this._mouseX = event.touches[0].pageX - this._windowHalfX;
            this._mouseY = event.touches[0].pageY - this._windowHalfY;
        }
    }

    /**
     * @summary Manipulates the DOM of the current page.
     * @param {IScope}      scope   Angular scope object.
     * @param {JQuery}      element jqLite-wrapped element that this directive matches.
     * @param {IAttributes} attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
     */
    public link = (scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): void => {
        var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight;

			this._mouseX = 0;
            this._mouseY = 0;

			this._windowHalfX = window.innerWidth / 2;
			this._windowHalfY = window.innerHeight / 2;

			this._camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
			this._camera.position.z = 1000;

			this._scene = new THREE.Scene();

			this._renderer = new THREE.CanvasRenderer();
			this._renderer.setPixelRatio( window.devicePixelRatio);
			this._renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

            var container = element[0];
			container.appendChild(this._renderer.domElement);

			var PI2 = Math.PI * 2;
			var material = new THREE.SpriteCanvasMaterial( {
				color: 0xffffff,
				program: (context) => {
					context.beginPath();
					context.arc( 0, 0, 0.5, 0, PI2, true );
					context.fill();
				}
			});

			for (var i = 0; i < 1000; i++) {
				var particle = new THREE.Sprite(material);
				particle.position.x = Math.random() * 2 - 1;
				particle.position.y = Math.random() * 2 - 1;
				particle.position.z = Math.random() * 2 - 1;
				particle.position.normalize();
				particle.position.multiplyScalar(Math.random() * 10 + 450);
				particle.scale.multiplyScalar(2);

				this._scene.add(particle);
			}

			for (var i = 0; i < 300; i++) {
				var vertex = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
				vertex.normalize();
				vertex.multiplyScalar(450);

                var geometry = new THREE.Geometry();
				geometry.vertices.push( vertex );

				var vertex2 = vertex.clone();
				vertex2.multiplyScalar(Math.random() * 0.3 + 1);
				geometry.vertices.push(vertex2);

				var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: Math.random() }));
				this._scene.add(line);
			}

			document.addEventListener("mousemove", this._onDocumentMouseMove, false);
			document.addEventListener("touchstart", this._onDocumentTouchStart, false);
			document.addEventListener("touchmove", this._onDocumentTouchMove, false);

			window.addEventListener("resize", this._onWindowResize, false);

			this._animate();
    }
}

export = CanvasLineSphereDirective;
app.module.directive("canvasLineSphere", () => new CanvasLineSphereDirective());
