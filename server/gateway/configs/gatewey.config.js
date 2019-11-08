

module.exports = {
    '/www': {
        methods: 'get',
        policies: [
            {
                type: 'header',
                contain: [
                    {
                        name: '',
                        value: ''
                    }
                ],
                notContain:[

                ],
                equal: [

                ],
                notEqual: [

                ],
                add: [],
                remove: [],
                modify: []
            },
            {
                type: 'path',
                contain: [

                ],
                notContain:[

                ],
                equal: [

                ],
                notEqual: [

                ]
            },
            {
                type: 'query',
                contain: [

                ],
                notContain:[

                ],
                equal: [

                ],
                notEqual: [

                ],
                add: [],
                remove: [],
                modify: []
            },
            {
                type: 'body',
                contain: [

                ],
                notContain:[

                ],
                equal: [

                ],
                notEqual: [

                ],
                add: [],
                remove: [],
                modify: []
            },
            {
                type: 'token'
            }
        ]
    }
}