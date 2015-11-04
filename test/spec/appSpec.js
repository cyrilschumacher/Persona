'use strict';

define(['app'],
  function(app) {
    describe('Application', function() {
      it('should call initialize', function() {
        app.initialize();
        expect(app.module).toBeDefined();
      });
    });
  }
);
