describe("app-test", function(){
    describe("app-test.my_method()", function(){
        it("should return 1", function(done){
            _use('app-test@latest', function(exports) {
                expect('my_method' in exports);
                done();
            });
        });
    });
});