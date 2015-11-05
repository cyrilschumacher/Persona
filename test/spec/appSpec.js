'use strict';

define(['app'],
    function(app) {
        describe('Application', function() {
            it('should call initialize', function() {
                app.initialize();
            });

            it('should be defined and not null', function() {
                app.initialize();

                expect(app.module).toBeDefined();
                expect(app.module).not.toBeNull();
            });
        });
    }
);
